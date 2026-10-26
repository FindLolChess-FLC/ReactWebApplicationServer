# FLC 기여 규칙

## 커밋 메시지

커밋 메시지는 `이모지 : 변경 내용` 형식으로 작성합니다.
커밋 메시지를 자동으로 검사하는 도구나 GitHub 강제 규칙은 없습니다.
기존 이력에는 공백 차이와 일반 텍스트 메시지도 있습니다.

주요 Gitmoji는 [Gitmoji 공식 가이드](https://gitmoji.dev/)를 기준으로 다음과 같이 사용합니다.

| Gitmoji | 모양 | 사용 용도 |
| --- | --- | --- |
| ✨ | 반짝임 | 새로운 기능 추가 |
| 🐛 | 벌레 | 버그 수정 |
| 🚑️ | 구급차 | 긴급한 치명적 오류 수정 |
| 💄 | 립스틱 | UI·스타일 추가 및 수정 |
| 🚸 | 어린이 횡단 표지 | UX·사용성 개선 |
| 📱 | 휴대전화 | 반응형 디자인 작업 |
| ♿️ | 휠체어 | 접근성 개선 |
| 🎨 | 팔레트 | 코드 구조·형식 개선 |
| ♻️ | 재활용 | 코드 리팩터링 |
| ⚡️ | 번개 | 성능 개선 |
| 🔥 | 불 | 코드·파일 삭제 |
| 📝 | 메모 | 문서 추가·수정 |
| ✅ | 체크 표시 | 테스트 추가·수정 및 통과 |
| 🔧 | 렌치 | 설정 파일 추가·수정 |
| 🔨 | 망치 | 개발 스크립트 추가·수정 |
| 👷 | 건설 작업자 | CI 빌드 시스템 추가·수정 |
| 💚 | 초록 하트 | CI 빌드 오류 수정 |
| ⬆️ | 위쪽 화살표 | 의존성 버전 업그레이드 |
| 🔒️ | 자물쇠 | 보안·개인정보 문제 수정 |
| 🚀 | 로켓 | 배포 |
| ⏪️ | 되감기 | 변경 사항 되돌리기 |
| 🔀 | 교차 화살표 | 브랜치 머지 |

예: `✨ : 댓글 수정 기능 추가`, `💄 : 로그인 폼 UI 수정`, `🚸 : 검색 필터 사용성 개선`

UI/UX 작업 중 화면·스타일 변경에는 💄, 사용 흐름·편의성 개선에는 🚸를 선택합니다.
기존 이력에서 ✅를 시즌 업데이트 등에 사용한 경우가 있지만, 앞으로는 위 표의 테스트 용도로 사용합니다.

GitHub가 생성하는 merge 커밋 메시지는 그대로 사용해도 됩니다.

## 브랜치 및 머지 규칙

- `main`: 배포 기준 브랜치. 원격 develop에 먼저 반영한 내용을 직접 merge·push합니다. PR은 필수가 아닙니다.
- `develop`: 개발 통합 브랜치. 2026-10-26에 당시 main 커밋 `3519961e83fc51cb9d410454a4cc612e37575de3`에서 생성했습니다.
- 기능 작업은 develop에서 만든 `feature/이름` 브랜치에서 진행하고, develop에 통합해 먼저 push합니다.
- 기능 브랜치 이름은 `feature/이름` 형식으로 통일합니다. 예: `feature/login`, `feature/champion-filter`.
- 요청 표현인 `feature:이름`은 Git에서 `:`를 브랜치 이름에 허용하지 않아 사용할 수 없습니다. 실제 브랜치에서는 구분자로 `/`를 사용합니다.
- 브랜치 이름은 문서 규칙이며 자동으로 강제하는 검사는 없습니다.
- main의 강제 push와 삭제는 GitHub Ruleset으로 차단합니다.

## 로컬 훅 설치

이 저장소에서는 다음 명령으로 훅을 활성화합니다. 새로 clone한 환경에서도 한 번 실행해야 합니다.

```sh
git config core.hooksPath .githooks
```

`.githooks/pre-push`는 main에 push할 때 실제 목적지의 develop을 fetch하여 검사합니다.
원격 develop에 포함된 커밋으로의 fast-forward 또는 원격 main과 develop을 합친 정상적인 merge commit을 허용합니다.
main에서만 만든 커밋, develop에 올리지 않은 변경, merge 결과에 임의로 추가한 변경은 차단합니다.
충돌이 있으면 develop에서 해결해 먼저 push한 뒤 main에 반영합니다.
검사를 위해 Git 2.38 이상과 원격 저장소 연결이 필요합니다.

로컬 훅은 `--no-verify`로 우회할 수 있고, 미설치 환경이나 GitHub 웹에서 하는 변경에는 적용되지 않습니다.
GitHub 서버는 강제 push·삭제 방지만 강제하며 develop 경유 여부는 로컬 훅이 검사합니다.

## 일반 작업 흐름

기능 브랜치를 만들어 작업한 뒤 develop으로 직접 머지합니다.
아래 `login`은 실제 작업 이름으로 바꿉니다.

```sh
git switch develop
git pull --ff-only origin develop
git switch -c feature/login
# 기능 구현 후 변경 파일을 git add하고 커밋합니다.
git switch develop
git merge feature/login
git push origin develop
```

develop에 통합한 작업 내용을 다음처럼 main에 반영합니다.
작업 트리가 깨끗한 상태에서 실행합니다.

```sh
git push origin develop
git fetch origin
git switch main
git merge --ff-only origin/main
git merge origin/develop
git push origin main
git switch develop
```

`git merge --no-ff origin/develop`도 허용합니다. 이 방식으로 main에 merge commit이 생기면
다음 개발 전에 해당 main을 develop에 merge하고 push하여 두 브랜치를 동기화합니다.
main이 원격과 갈라져 있으면 강제 push하지 말고 변경을 develop으로 옮겨 먼저 통합합니다.
