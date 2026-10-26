# FLC 기여 규칙

## 커밋 메시지

기존 커밋 이력에서 사용하는 형식은 `이모지 : 변경 내용`입니다.
커밋 메시지를 자동으로 검사하는 도구나 GitHub 강제 규칙은 없습니다.
기존 이력에는 공백 차이와 일반 텍스트 메시지도 있습니다.

| 이모지 | 주로 사용한 변경 |
| --- | --- |
| ✨ | 기능 추가·수정 |
| 🐛 | 버그 수정 |
| 💄 | UI·디자인 변경 |
| 🎨 | 코드·폴더 구조 정리 |
| ⚡️ | 성능 개선 |
| ✅ | 업데이트·검증 관련 변경 (기존 사용 의미는 일관되지 않음) |

예: `✨ : 댓글 수정 기능`, `🐛 : 비밀번호 찾기 URL 수정`

GitHub가 생성하는 merge 커밋 메시지는 그대로 사용해도 됩니다.

## 브랜치 및 머지 규칙

- `main`: 배포 기준 브랜치. 원격 develop에 먼저 반영한 내용을 직접 merge·push합니다. PR은 필수가 아닙니다.
- `develop`: 개발 통합 브랜치. 2026-10-26에 당시 main 커밋 `3519961e83fc51cb9d410454a4cc612e37575de3`에서 생성했습니다.
- 기능·수정 작업은 develop 또는 develop에서 만든 작업 브랜치에서 진행하고, develop에 통합해 먼저 push합니다.
- 작업 브랜치 이름은 `feature/작업명`, `fix/작업명`, `chore/작업명`을 권장하며 강제하지 않습니다.
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

작업 내용을 develop에 커밋하고 push한 뒤 다음처럼 main에 반영합니다.
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
