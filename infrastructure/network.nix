let envHelper = import ./env.nix; in
{
  nixkola = { modulesPath, lib, name, ... }: {
    imports = lib.optional (builtins.pathExists ./do-userdata.nix) ./do-userdata.nix ++ [
      (modulesPath + "/virtualisation/digital-ocean-config.nix")
    ];

    deployment.targetHost = envHelper.HOST_IP;
    deployment.targetUser = "root";

    networking.hostName = name;

    networking.firewall.allowedTCPPorts = [ 80 443 ];

    services.postgresql.enable = true;

    # services.nginx = {
    #   enable = true;
    #   recommendedProxySettings = true;
    #   recommendedTlsSettings = true;
    #   virtualHosts."ekoskola.app.com" = {
    #     default = true;
    #     addSSL = true;
    #     enableACME = true;
    #     root = "/var/www/ekoskola.app.com";
    #   };
    # };

    security.acme = {
      defaults = {
        email = envHelper.ACME_EMAIL;
      };
      acceptTerms = true;
    };


    # deployment.healthChecks = {
    #   http = [
    #     {
    #       scheme = "https";
    #       port = 443;
    #       host = "ekoskola.app.com";
    #       path = "/";
    #       description = "Check that ekoskola is running.";
    #     }
    #   ];
    # };

  };
}