{ pkgs, lib, config, inputs, ... }:

{
  packages = [ pkgs.git ];

  enterShell = ''
  '';

  # https://devenv.sh/tests/
  enterTest = ''
    echo "Running tests"
    git --version | grep "2.42.0"
  '';

  # https://devenv.sh/services/
  services.postgres.enable = true;

  # https://devenv.sh/languages/
  # languages.nix.enable = true;
  languages.typescript.enable = true;

  # https://devenv.sh/pre-commit-hooks/
  # pre-commit.hooks.shellcheck.enable = true;

  # https://devenv.sh/processes/
  # processes.ping.exec = "ping example.com";
  processes.web.exec = "bun run dev --port=3030";

  # See full reference at https://devenv.sh/reference/options/
}
