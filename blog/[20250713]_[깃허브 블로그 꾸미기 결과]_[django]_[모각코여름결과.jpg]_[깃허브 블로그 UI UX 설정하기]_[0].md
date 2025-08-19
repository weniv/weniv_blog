# 깃허브 블로그 꾸미기

### 25.07.13.
### [오늘 목표]
- GITHUB 블로그 애니메이션 적용 (화면 구성, 라이트-다크모드 적용 등)
- 블로그 UI/UX 수정
- 자료구조 정리 내용 업로드



### 결과

## 🌟 블로그 리디자인 및 기능 개선 기록

2025년 7월, GitHub Pages 기반 블로그의 시각적 디자인과 데이터 구조를 개선했습니다.  
이번 작업은 디자인 개선뿐 아니라 로컬/배포 환경 문제 해결, 파일 구조 점검, 디버깅 경험까지 모두 포함한 리팩터링 작업이었습니다.

---

### ✅ 카드 레이아웃에 글래스모피즘 효과 적용

- 기존 카드가 단색 박스 형태였던 것을 개선해 “유리 느낌”의 반투명 카드로 변경
- Tailwind CSS 클래스 조합:
  ```html
  bg-white/30 backdrop-blur-lg shadow-xl
  hover:bg-white/50 transform hover:scale-105 transition duration-200
  ```
- 적용 위치: `style/globalStyle.js`
- 관련 스타일: `bloglistCardStyle`, `bloglistFirstCardStyle`

---

### ✅ 네비게이션 스타일 개선

- 상단 메뉴 영역을 반투명 헤더로 변경 (`bg-white/70 backdrop-blur-md`)
- 메뉴 아이템을 `justify-center`, `gap-6`으로 간결하게 정렬
- 로고 이미지를 `<h1>` 대신 `<img>`로 독립 배치하여 크기 제한 해제
- 모바일에서는 기존 구조 유지 + 메뉴 토글 가능

---

### 🛠 파일명 패턴 문제 → `extractFileInfo()`에서 필터됨

- 문제 발생 원인:
  - 파일명을 `[20250624]_[제목]_[카테고리]_[]_[]_[작성자].md` 패턴에서 벗어나게 작성
  - `utils.js`의 `extractFileInfo()` 함수는 정확한 대괄호 + 6필드 구조만 통과시킴
- 문제 해결:
  - 파일명을 다시 정규식에 맞게 작성
  - 향후 개선을 위해 정규표현식을 유연하게 수정할 수도 있음

---

### 🌐 API와 로컬 환경 구분

- `initData.js`에서 데이터 초기화 조건:
  ```js
  if (isLocal) {
    fetch("/data/local_blogList.json");
  } else {
    fetch("https://api.github.com/repos/.../contents/blog");
  }
  ```
- 로컬에서는 정적 JSON만 읽기 때문에 실제 `.md` 파일 추가해도 안 보임
- 해결 방법:
  - GitHub API를 항상 사용하도록 강제하거나
  - 로컬 JSON 수동 갱신

---

### 🐛 디버깅하며 알게 된 인사이트

- JS 오류 메시지를 정확히 읽는 습관이 중요  
  예: `Cannot read property 'innerHTML' of null` → 해당 ID가 HTML에 존재하지 않음
- `blogList = blogList.filter(post => extractFileInfo(post.name))` 와 같은 필터링 로직이 있다는 걸 알게 됨
- `new Date("20250624")` 는 `Invalid Date` → 정렬 시 포맷 보정 필요:
  ```js
  const norm = (str) => str.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
  ```

---

### 🔚 마무리

이번 리팩터링을 통해 디자인 퀄리티뿐 아니라 파일 구조, 데이터 흐름, 디버깅 관점에서도 큰 인사이트를 얻었습니다.  
앞으로는 코드를 짤 때 생기는 오류와 규칙을 더 정확히 파악하고,  
디자인과 구조 모두를 함께 고민하는 블로그로 발전시켜 나갈 예정입니다.
