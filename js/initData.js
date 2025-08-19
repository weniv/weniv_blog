// initData.js
let blogList = [];
let blogMenu = [];
let isInitData = false;

async function initDataBlogList() {
  if (blogList.length > 0) {
    return blogList;
  }
  isInitData = true;

  let response;
  if (isLocal) {
    response = await fetch(url.origin + "/data/local_blogList.json");
  } else {
    if (!siteConfig.username || !siteConfig.repositoryName) {
      const urlConfig = extractFromUrl();
      siteConfig.username = siteConfig.username || urlConfig.username;
      siteConfig.repositoryName = siteConfig.repositoryName || urlConfig.repositoryName;
    }
    response = await fetch(`https://api.github.com/repos/${siteConfig.username}/${siteConfig.repositoryName}/contents/blog`);
  }
  blogList = await response.json();

  blogList = blogList.filter((post) => {
    return Boolean(extractFileInfo(post.name));
  });

  blogList.sort((a, b) => {
    const d1 = extractFileInfo(a.name)?.date || "00000000";
    const d2 = extractFileInfo(b.name)?.date || "00000000";
    const norm = (str) => str.includes("-") ? str : str.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    return new Date(norm(d2)) - new Date(norm(d1));
  });

  return blogList;
}

async function initDataBlogMenu() {
  if (blogMenu.length > 0) {
    return blogMenu;
  }

  let response;
  if (isLocal) {
    response = await fetch(url.origin + "/data/local_blogMenu.json");
  } else {
    if (!siteConfig.username || !siteConfig.repositoryName) {
      const urlConfig = extractFromUrl();
      siteConfig.username = siteConfig.username || urlConfig.username;
      siteConfig.repositoryName = siteConfig.repositoryName || urlConfig.repositoryName;
    }
    response = await fetch(`https://api.github.com/repos/${siteConfig.username}/${siteConfig.repositoryName}/contents/menu`);
  }
  blogMenu = await response.json();
  return blogMenu;
}
