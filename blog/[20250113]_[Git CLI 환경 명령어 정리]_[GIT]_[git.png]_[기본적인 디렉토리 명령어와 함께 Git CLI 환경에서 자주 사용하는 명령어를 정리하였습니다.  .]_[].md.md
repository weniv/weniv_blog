# Git CLI 명령어 정리

기본적인 디렉토리 명령어와 함께 Git CLI 환경에서 자주 사용하는 명령어를 정리하였습니다. 


## 디렉토리 작업

### 1. 디스크 변경
현재 작업 중인 디스크를 변경합니다.  
예: `C 드라이브`로 이동.
```bash
C:
```

### 2. 폴더 내용 확인
현재 디렉토리의 파일 및 폴더 목록을 확인합니다.
```bash
ls -all
git status
```

### 3. 새로운 디렉토리 생성
새로운 폴더(디렉토리)를 생성합니다.
```bash
mkdir GitDirectory1
```

### 4. 생성된 폴더로 이동
작업할 디렉토리로 이동합니다.
```bash
cd GitDirectory1
```

---

<br>

## Git 저장소 초기화

### 5. Git 저장소 생성
해당 디렉토리를 Git으로 관리하기 위한 저장소를 생성합니다.
```bash
git init
```

---

## Git 작업 흐름

### 6. 커밋 그래프 확인
현재 브랜치와 커밋 이력을 시각적으로 확인합니다.
```bash
git log --oneline --graph --all
```

### 7. 파일 스테이징
#### 7-1. 특정 파일 스테이징
Git에 특정 파일을 스테이징하여 추적하도록 설정합니다.
```bash
git add GitFile1.txt
```

#### 7-2. 모든 파일 스테이징
현재 디렉토리 내의 모든 변경 사항을 스테이징합니다.
```bash
git add .
```

---

### 8. 파일 언스테이징
스테이징된 파일을 다시 추적 해제합니다.
```bash
git reset GitFile1.txt
```

---

### 9. 커밋
스테이징된 파일들을 하나의 버전으로 기록합니다.
```bash
git commit -m "Commit1"
```

---

### 10. 커밋 취소 및 이동
#### 10-1. 최근 커밋 취소
가장 마지막에 한 커밋을 되돌립니다.
```bash
git reset --hard HEAD~
```

#### 10-2. 특정 커밋으로 이동
지정된 커밋으로 작업 디렉토리를 되돌립니다.
```bash
git reset --hard [커밋체크섬]
```

---

## 브랜치 작업

### 11. 브랜치 커밋 이력 확인
#### 11-1. 상세 이력 보기
커밋의 상세 정보를 확인합니다.
```bash
git log
```

#### 11-2. 간단한 이력 보기
커밋 해시와 메시지만 간단히 확인합니다.
```bash
git log --oneline
```

---

## 원격 작업

### 12. 원격 변경 사항 패치
원격 저장소의 변경 사항을 다운로드합니다.
```bash
git fetch --all
```

### 13. 로컬 사용자 정보 등록
Git에서 사용할 사용자 정보를 설정합니다.
```bash
git config --global user.email "youremail@gmail.com"
git config --global user.name "yourname"
```

### 14. 원격 저장소 등록
작업 중인 저장소와 원격 저장소를 연결합니다.
```bash
git remote add origin https://github.com/yourname/repository.git
```

### 15. 변경 사항 푸쉬
#### 15-1. 기본 푸쉬
로컬 변경 사항을 원격 저장소로 업로드합니다.
```bash
git push origin master
```

#### 15-2. 푸쉬 설정 등록
한 번 설정하면 이후부터는 간단히 푸쉬할 수 있습니다.
```bash
git push -u origin master
```

---

### 16. 푸쉬 취소
방금 푸쉬한 커밋을 취소하고 원격 저장소를 업데이트합니다.
```bash
git reset --hard HEAD^
git push origin master --force
```

---

## 저장소 복제

### 17. 저장소 클론
#### 17-1. 기본 클론
원격 저장소를 로컬에 복제합니다.
```bash
git clone https://github.com/yourname/repository.git
```

#### 17-2. 특정 디렉토리에 클론
복제 시 저장 위치를 지정합니다.
```bash
git clone https://github.com/yourname/repository.git NewDirectory
```

---

## 브랜치 생성 및 관리

### 18. 브랜치 생성
#### 18-1. 기본 브랜치 생성
새로운 브랜치를 생성합니다.
```bash
git branch branch1
```

#### 18-2. 특정 커밋 기반 브랜치 생성
지정된 커밋 체크섬으로부터 브랜치를 생성합니다.
```bash
git branch branch1 [커밋체크섬]
```

#### 18-3. 브랜치 생성 및 이동
브랜치를 생성하면서 해당 브랜치로 이동합니다.
```bash
git checkout -b branch1
```

### 19. 브랜치 삭제
불필요한 브랜치를 삭제합니다.
```bash
git branch -d branch1
```

---

## 브랜치 병합

### 20. 브랜치 병합
현재 브랜치에 다른 브랜치를 병합합니다.
```bash
git merge branch2
```

---

## 충돌 해결

### 21. 충돌 해결 후 커밋
충돌을 해결한 뒤 변경 사항을 커밋합니다.
```bash
git add .
git commit -m "Conflict resolved"
git push origin master
```