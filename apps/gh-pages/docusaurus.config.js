/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "yoda-js",
  tagline: "Your Offline-first DAtastore",
  url: "https://yoda-js.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.svg",
  organizationName: "yoda-js", // Usually your GitHub org/user name.
  projectName: "yoda-js.github.io", // Usually your repo name.
  trailingSlash: false,
  themeConfig: {
    navbar: {
      title: "yoda-js",
      logo: {
        alt: "yoda-js logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "doc",
          docId: "introduction",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://github.com/yoda-js",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `<a href="/license">About yoda-js documentation</a><br />Copyright © ${new Date().getFullYear()} yoda-js`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
