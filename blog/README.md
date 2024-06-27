# WENIVLOG

## 프로젝트 소개
- GitHub Pages를 활용하여 블로그를 손쉽게 제작할 수 있는 서비스입니다.
- fork를 이용하여 자신의 레포지토리로 이동하여 나만의 블로그를 제작할 수 있습니다.

## 개발 정보
- 개발사: 주식회사 위니브
- 버전: v1.0.0

- 서비스 URL 정보
  - 매뉴얼 페이지: https://blog.weniv.co.kr/
  - 블로그 페이지(예시): https://weniv.github.io/weniv_blog/


## 스폰서
- 커피 한 잔 값으로 위니브의 활동을 지원하고 기여자로 참여하세요!

[후원하기](https://github.com/sponsors/weniv?o=esb)


## 사용 가이드
### 블로그 개설
1. 해당 레포지토리를 fork 합니다.
2. 본인의 레포지토리로 이동하여, 설정에서 GitHub Pages를 활성화합니다.
3. 본인의 레포지토리를 clone하여 블로그를 관리할 수 있습니다.

## 블로그 관리
1. clone한 프로젝트 폴더의 config.js 파일을 수정합니다.
2. siteConfig에 GitHub 정보를 입력합니다.
3. users에 자신의 정보를 입력합니다. 여러명이서 블로그를 함께 관리하는 경우, 사용자 정보를 추가할 수 있습니다.

## 블로그 작성
1. 글은 blog 폴더에 작성하며, `[date]_[title]_[category]_[thumnail]_[description].md` 형식으로 작성합니다.
2. 썸네일을 사용하지 않는 경우, `[date]_[title]_[category]_[].md` 형식으로 작성합니다.
3. 썸네일의 경로는 img 폴더에서 관리하거나 퍼블리싱 된 이미지 링크를 사용할 수 있습니다.
4. `data/localBlogList.json`을 수정하여 화면에 출력할 글을 관리합니다.

## 메뉴 관리
우측 상단의 메뉴를 관리하는 방법은 다음과 같습니다.
1. menu 폴더에 `사용하고싶은 메뉴 이름.md` 형식으로 저장하면 메뉴로 생성됩니다.
2. `data/local_blogMenu.json`을 관리하여 화면에 출력할 메뉴를 관리합니다.


## 디자인 수정
- `style/globalStyle.js` 파일을 수정하여 전체적인 스타일을 수정할 수 있습니다.
- Tailwind CSS를 이용하여 손쉽게 나만의 스타일을 적용할 수 있습니다.
- 프로필로 사용할 수 있는 위니브 프렌즈의 이미지와 썸네일 일러스트를 제공합니다.


## 폴더 트리

  | 폴더명 | 파일명               | 함수                                   | 변수                                         | 비고                          |
  | ------ | -------------------- | -------------------------------------- | -------------------------------------------- | ----------------------------- |
  | style  | globalStyle.js       |                                        |                                              | 전역 스타일 설정              |
  | style  | blogContentsStyle.js |                                        |                                              | 블로그 컨텐츠 스타일 설정     |
  | JS     | config.js            |                                        | siteConfig                                   | 사이트 설정 정보              |
  | JS     | URLparsing.js        | extractFromUrl()                       | url(url obj), pathParts(쿼리스트링), isLocal | URL 파싱, 스키마 확인         |
  | JS     | render.js            | renderBlogPosts(), renderMenu()        |                                              | 데이터를 DOM에 렌더링         |
  | JS     | initData.js          | initDataBlogList(), initDataBlogMenu() | blogList, blogMenu                           | 초기 데이터 로딩, 스키마 확인 |
