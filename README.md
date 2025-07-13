# SpringReact 중고거래 플랫폼

## 📋 프로젝트 개요
Spring Boot와 React를 활용한 중고거래 플랫폼입니다. 사용자가 상품을 등록, 조회, 수정, 삭제할 수 있는 CRUD 기능을 제공하며, 이미지 업로드 기능을 포함합니다.

## 🛠 사용 기술

### Backend (Spring Boot)
- **Java 17**
- **Spring Boot 3.4.3**
- **Spring Data JPA** - 데이터베이스 ORM
- **Spring Web** - REST API 개발
- **H2 Database** - 인메모리 데이터베이스
- **Thymeleaf** - 템플릿 엔진
- **Maven** - 빌드 도구

### Frontend (React)
- **React 19.0.0**
- **React Router DOM 7.3.0** - 클라이언트 사이드 라우팅
- **React Bootstrap 2.10.9** - UI 컴포넌트
- **Bootstrap 5.3.3** - CSS 프레임워크
- **Axios 1.8.1** - HTTP 클라이언트
- **npm** - 패키지 관리

## 📁 프로젝트 구조

```
SpringReact/
├── front/                    # Spring Boot 백엔드
│   ├── src/main/java/com/example/spring_0306/
│   │   ├── Spring0306Application.java     # 메인 애플리케이션
│   │   ├── Product.java                  # 상품 엔티티
│   │   ├── ProductController.java        # REST API 컨트롤러
│   │   ├── ProductRepository.java        # JPA 리포지토리
│   │   ├── Login.java                    # 로그인 엔티티
│   │   ├── LoginController.java          # 로그인 컨트롤러
│   │   ├── LoginRepository.java          # 로그인 리포지토리
│   │   └── WebConfig.java               # 웹 설정 (정적 리소스)
│   ├── src/main/resources/
│   └── pom.xml                          # Maven 설정
├── back/                     # React 프론트엔드
│   ├── src/
│   │   ├── components/              # React 컴포넌트
│   │   │   ├── Header.js           # 헤더 컴포넌트
│   │   │   ├── Nav.js              # 상품 목록 네비게이션
│   │   │   ├── Article.js          # 상품 상세 보기
│   │   │   ├── Create.js           # 상품 등록
│   │   │   ├── Update.js           # 상품 수정
│   │   │   ├── Login.js            # 로그인
│   │   │   ├── Register.js         # 회원가입
│   │   │   └── Router.js           # 라우터 설정
│   │   ├── context/
│   │   │   └── ProductContext.js   # 상품 상태 관리
│   │   ├── App.js                  # 메인 앱 컴포넌트
│   │   └── index.js               # 애플리케이션 진입점
│   └── package.json               # npm 설정
└── uploads/                       # 업로드된 이미지 저장소
```

## 🚀 실행 방법

### 1. 백엔드 실행 (Spring Boot)

```bash
# front 디렉토리로 이동
cd front

# Maven을 사용하여 애플리케이션 실행
./mvnw spring-boot:run

# 또는 IDE에서 Spring0306Application.java 실행
```

백엔드는 `http://localhost:8080`에서 실행됩니다.

### 2. 프론트엔드 실행 (React)

```bash
# miniproject 디렉토리로 이동
cd miniproject

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

프론트엔드는 `http://localhost:3000`에서 실행됩니다.

## 📝 주요 기능

### 1. 상품 관리 (CRUD)
- **상품 조회**: 등록된 모든 상품을 카드 형태로 표시
- **상품 등록**: 제목, 가격, 설명, 지역, 이미지를 포함한 상품 정보 등록
- **상품 수정**: 기존 상품 정보 수정 (이미지 포함)
- **상품 삭제**: 상품 삭제 기능

### 2. 이미지 처리
- 멀티파트 파일 업로드 지원
- UUID를 사용한 고유 파일명 생성
- 정적 리소스 서빙을 통한 이미지 표시

### 3. 사용자 인터페이스
- Bootstrap을 활용한 반응형 디자인
- 당근마켓 스타일의 색상 테마 적용
- React Router를 통한 SPA 구현

## 🔧 API 엔드포인트

### 상품 API (`/api/products`)
- `GET /api/products` - 모든 상품 조회
- `POST /api/products` - 상품 등록 (multipart/form-data)
- `PUT /api/products/{id}` - 상품 수정 (multipart/form-data)
- `DELETE /api/products/{id}` - 상품 삭제

### 정적 리소스
- `GET /uploads/{filename}` - 업로드된 이미지 파일 접근

## 🎯 주요 특징

### Backend 특징
- **RESTful API**: 표준 REST 아키텍처 준수
- **JPA/Hibernate**: 객체 관계 매핑으로 데이터베이스 관리
- **CORS 설정**: React 앱과의 통신을 위한 CORS 허용
- **파일 업로드**: MultipartFile을 활용한 이미지 처리
- **H2 Database**: 개발 편의를 위한 인메모리 데이터베이스 사용

### Frontend 특징
- **Context API**: 전역 상태 관리로 상품 데이터 공유
- **React Hooks**: useState, useEffect, useContext 활용
- **Component 기반**: 재사용 가능한 컴포넌트 구조
- **Responsive Design**: 다양한 화면 크기에 대응

## 💡 개발 팁

### 개발 환경 설정
1. Java 17 이상 설치 필요
2. Node.js 16 이상 설치 필요
3. IDE는 IntelliJ IDEA 또는 VS Code 권장

### 데이터베이스 접근
H2 콘솔: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (비워둠)

### 포트 설정
- 백엔드: 8080 포트
- 프론트엔드: 3000 포트
- CORS는 localhost:3000에서 localhost:8080으로 설정됨

## 🔍 코드 설명

### 주요 컴포넌트

1. **ProductContext.js**: 상품 데이터의 전역 상태 관리 및 API 통신
2. **ProductController.java**: REST API 엔드포인트 정의 및 비즈니스 로직
3. **Router.js**: React Router를 활용한 페이지 라우팅
4. **Nav.js**: 상품 목록을 카드 형태로 표시하는 메인 페이지

### 데이터 흐름
1. React 앱이 마운트되면 ProductContext에서 Spring Boot API 호출
2. Spring Boot는 H2 데이터베이스에서 상품 데이터 조회
3. 조회된 데이터를 JSON 형태로 React 앱에 전송
4. React 앱은 받은 데이터를 Context를 통해 전역 상태로 관리
5. 각 컴포넌트는 Context에서 필요한 데이터와 함수를 사용

이 프로젝트는 Full-Stack 웹 개발의 기본적인 패턴을 보여주며, 실제 중고거래 플랫폼의 핵심 기능들을 구현한 학습용 프로젝트입니다.
