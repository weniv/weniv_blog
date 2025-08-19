// config.js

const siteConfig = {
  username: "simhyeongseop", // <<--- 'simhyeongseop'으로 정확히 입력!
  repositoryName: "weniv_blog", // <<--- 'weniv_blog'로 정확히 입력!
  mainColor: "#3498db",
  textColor: "#ffffff",
  blogTitle: "심형섭 블로그",
};

const users = [
  {
    id: 0, // default author
    username: "심형섭",
    company: "충남대학교",
    position: "2학년 학부생",
    img: "img/profile.jpg",
  },
];

const localDataUsing = false; // GitHub API를 사용하여 블로그 목록을 가져올 것이므로 false로 유지