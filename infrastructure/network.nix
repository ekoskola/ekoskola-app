let envHelper = import ./env.nix; in
{
  nixkola = { modulesPath, lib, name, pkgs, ... }: {
    imports = lib.optional (builtins.pathExists ./do-userdata.nix) ./do-userdata.nix ++ [
      (modulesPath + "/virtualisation/digital-ocean-config.nix")
    ];

    environment.systemPackages = with pkgs; [
      git
      vim
      nodejs
      yarn
    ];

    deployment.targetHost = envHelper.HOST_IP;
    deployment.targetUser = "root";

    networking.hostName = name;

    networking.firewall.allowedTCPPorts = [ 80 443 ];

    #   "/var/www/ekoskola".source = builtins.fetchGit {
    #     url = "https://github.com/ekoskola/ekoskola-app";
    #     ref = "master";
    #   };

    services.postgresql = {
      enable = true;
      # package = pkgs.postgresql_15;
      enableTCPIP = true;
      authentication = pkgs.lib.mkOverride 10 ''
        local all all trust
        host all all 127.0.0.1/32 trust
        host all all ::1/128 trust
      '';
      # initialScript = pkgs.writeText "backend-initScript" ''
      #   CREATE ROLE ${envHelper.EKOSKOLA_DB_NAME} WITH LOGIN PASSWORD '${envHelper.EKOSKOLA_DB_PASSWORD}' CREATEDB;
      #   CREATE DATABASE ${envHelper.EKOSKOLA_DB_NAME};
      #   GRANT ALL PRIVILEGES ON DATABASE ${envHelper.EKOSKOLA_DB_NAME} TO ${envHelper.EKOSKOLA_DB_NAME};
      # '';
    };

    systemd.services.ekoskolaServer = {
      description = "Server for ekoskola app";
      after = [ "multi-user.target" ];
      wantedBy = [ "multi-user.target" ];
      path = [ pkgs.bash ];
      serviceConfig = {
        User = "root";
        WorkingDirectory = "/var/www/ekoskola/ekoskola-app";
        ExecStart = "${pkgs.yarn}/bin/yarn workspace @ekoskola/server start";
        Restart = "always";
      };
    };

    services.nginx = {
      enable = true;
      recommendedProxySettings = true;
      recommendedTlsSettings = true;
      virtualHosts."${envHelper.EKOSKOLA_SERVER_NGINX_HOST}" = {
        addSSL = true;
        enableACME = true;
        locations."/" = {
          proxyPass = "http://127.0.0.1:8000";
          basicAuth = {
            ekoskola = "${envHelper.EKOSKOLA_SERVER_NGINX_BASIC_AUTH}";
          };
        };
      };
      # virtualHosts."${envHelper.EKOSKOLA_FRONTEND_NGINX_HOST}" = {
      #   default = true;
      #   addSSL = true;
      #   enableACME = true;
      #   root = envHelper.EKOSKOLA_FRONTEND_NGINX_ROOT;
      #   locations."/" = {
      #     # https://stackoverflow.com/questions/43951720/react-router-and-nginx
      #     tryFiles = "$uri /index.html";
      #   };
      # };
    };

    security.acme = {
      defaults = {
        email = envHelper.ACME_EMAIL;
      };
      acceptTerms = true;
    };

    # When using basicAuth in nginx healthChecks are not applicable
    # deployment.healthChecks = {
    #   http = [
    #     {
    #       scheme = "https";
    #       port = 443;
    #       host = envHelper.EKOSKOLA_SERVER_NGINX_HOST;
    #       path = "/";
    #       description = "Check that ekoskola is running.";
    #     }
    #   ];
    # };

  };
}