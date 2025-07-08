# 기록해SOL Frontend

### 첫 프로젝트 세팅

1. Depedency install
    ```
      pnpm install
    ```
2. .env.local 생성
3. 아래 항목 붙여넣기
    ```
    NEXT_PUBLIC_API_URL=http://localhost:3000
    API_URL=http://localhost:8000
    ```
4. src/app/fonts 폴더 생성
5. fonts 폴더 안에 Slack으로 받은 폰트 넣기
6. 폰트 이름 바꾸기(space를 under score로 변경)
    ```
      ONESHINHANLIGHT 2.ttf -> ONESHINHANLIGHT_2.ttf
      ONESHINHANMEDIUM 2.ttf -> ONESHINHANMEDIUM_2.ttf
      ONESHINHANBOLD 2.ttf -> ONESHINHANBOLD_2.ttf
    ```
7. 프로젝트 실행
    ```
      pnpm run dev
    ```

### 프로젝트 진행 중

- commitlint 적용되어 있어서 커밋 스타일 안 맞추면 push 안 됩니다.

    [컨벤션 참고](https://www.npmjs.com/package/@commitlint/config-conventional)

- push할 때 eslint 설정에 안 맞으면 push 안 되니깐 오류 메세지 잘 확인해주세요.

### TailwindCSS Custom Utility 스타일 사용 방법

아래 스타일 참고해서 개발하시면 됩니다.

```
  <div className="text-heading1 text-brand-shinhan-blue">HEADING1</div>

  <div className="text-heading2 text-brand-black">HEADING2</div>

  <div className="text-heading3 text-brand-light-blue">HEADING3</div>

  <div className="text-body1 text-brand-sky-blue">BODY1</div>

  <div className="text-body2 text-brand-royal-blue">BODY2</div>

  <div className="text-sub1 text-brand-navy-blue">SUB1</div>

  <div className="text-sub2 text-brand-white">SUB2</div>

  <div
  className="text-button">BUTTON</div>

  <div className="text-caption">CAPTION</div>

  <div className="text-overline">OVERLINE</div>
```
