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

    services.postgresql.enable = true;

    #   "/var/www/ekoskola".source = builtins.fetchGit {
    #     url = "https://github.com/ekoskola/ekoskola-app";
    #     ref = "master";
    #   };

    services.nginx = {
      enable = true;
      recommendedProxySettings = true;
      recommendedTlsSettings = true;
      virtualHosts."nixkola.carlosgo.me" = {
        default = true;
        addSSL = true;
        enableACME = true;
        root = "/var/www/ekoskola/ekoskola-app/packages/frontend/build/";
      };
    };

    security.acme = {
      defaults = {
        email = envHelper.ACME_EMAIL;
      };
      acceptTerms = true;
    };


    deployment.healthChecks = {
      http = [
        {
          scheme = "https";
          port = 443;
          host = "nixkola.carlosgo.me";
          path = "/";
          description = "Check that ekoskola is running.";
        }
      ];
    };

  };
}