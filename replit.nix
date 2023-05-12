{ pkgs }: {
	deps = [
		pkgs.openssh_with_kerberos
  pkgs.nodejs-12_x
		pkgs.nodePackages.typescript-language-server
		pkgs.yarn
		pkgs.replitPackages.jest
	];
}