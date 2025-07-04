# 📊 JavaScript Spreadsheet Web App  

이 프로젝트는 JavaScript 학습을 실용적 결과물로 확장하여 만든 **웹 기반 스프레드시트 애플리케이션**입니다. 

---

## 🚀 주요 기능

### ✅ 직관적인 그리드 UI  
- 깔끔하고 반응형인 **셀 기반 스프레드시트** 제공  
- 데이터 입력 및 수정이 직관적으로 가능

### 🎯 스마트 셀 하이라이트  
- 선택된 셀의 **행(좌측)** 및 **열(상단)** 헤더가  
  산뜻한 **하늘색**으로 동시에 강조되어 시각적 피드백 제공  
- 현재 선택 셀의 주소 (예: `A1`)를 **실시간 상태 표시줄**에서 확인 가능

### 📤 Excel 내보내기 (`Export`)  
- `Export Spreadsheet` 버튼 클릭으로 현재 데이터를 `.xlsx` 형식으로 저장  
- **Google 스프레드시트, Excel 등과 완벽 호환**

### 📥 Excel 가져오기 (`Import`)  
- `.xlsx` 또는 `.xls` 파일을 **즉시 불러오기** 가능  
- Google 스프레드시트에서 생성된 파일도 완벽하게 호환

---

## 📸 데모 미리보기

> 아래 이미지는 실제 앱의 화면 예시입니다.  
<p align="center">
  <img src="assets/images/screenshot01.PNG" alt="스프레드시트 데모 이미지" width="700" />
</p>
<p align="center">
  <img src="assets/images/screenshot02.PNG" alt="스프레드시트 데모 이미지" width="700" />
</p>
<p align="center">
  <img src="assets/images/screenshot03.PNG" alt="스프레드시트 데모 이미지" width="700" />
</p>
<p align="center">
  <img src="assets/images/screenshot04.PNG" alt="스프레드시트 데모 이미지" width="700" />
</p>

---

## 🗂 프로젝트 구조

```
.
├── index.html # UI 구성 및 HTML 구조
├── css/
│ └── style.css # 셀, 버튼, 레이아웃 등 스타일 정의
└── js/
└── script.js # 셀 로직, 선택 처리, Excel I/O 구현
```
---

## 🛠 사용 기술 스택

| 기술 | 설명 |
|------|------|
| **HTML5** | 구조화된 웹 페이지 설계 |
| **CSS3** | 반응형 스타일링 및 시각 효과 |
| **JavaScript (ES6+)** | 셀 로직, 사용자 인터랙션, 이벤트 처리 |
| **[SheetJS (js-xlsx)](https://sheetjs.com/)** | Excel 파일 읽기/쓰기 및 파싱 처리 |

---

## 📦 시작하는 방법

1. **앱 실행**  
   프로젝트 폴더 내 `index.html` 파일을 웹 브라우저에서 열기  
   > 💡 VS Code 사용자는 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 확장을 권장합니다.

2. **데이터 조작**  
   셀을 클릭하여 **입력 또는 수정**해 보세요.

3. **Excel 내보내기**  
   `Export Spreadsheet` 버튼 클릭 → `.xlsx` 파일 다운로드

4. **Excel 가져오기**  
   `파일 선택` 버튼으로 Excel 파일 업로드 → 스프레드시트에 자동 적용

---

## 💡 프로젝트 의의

> "기술을 배웠다면, 이제 직접 만들어 보세요."

이 프로젝트는 **JavaScript 학습의 결과물**일 뿐만 아니라, 실전에서 적용 가능한 **프론트엔드 인터랙티브 도구**를 구현한 경험입니다.  
UI/UX, 로직 처리, 파일 입출력 등 웹 개발 전반에 대한 **종합적 이해와 구현력**을 목표로 했습니다.

---

## 🙌 피드백 & 기여

이 프로젝트는 계속해서 발전 중입니다.  
더 나은 UX, 기능 개선, 버그 수정 등에 대한 제안은 언제든 환영합니다.

> 📧 Issue 등록 또는 Pull Request로 자유롭게 의견을 나눠주세요!

---
