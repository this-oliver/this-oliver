# Changelog

## [4.0.1](https://github.com/this-oliver/this-oliver/compare/v4.0.0...v4.0.1) (2025-10-24)


### Bug Fixes

* **frontend:** centers the welcome banner in the landing page ([#315](https://github.com/this-oliver/this-oliver/issues/315)) ([647e5bb](https://github.com/this-oliver/this-oliver/commit/647e5bb950c08c5ed2bac3d4999495d086d2a565))
* **frontend:** improved markdown rendering ([#316](https://github.com/this-oliver/this-oliver/issues/316)) ([ba592ef](https://github.com/this-oliver/this-oliver/commit/ba592ef2df3dd23aa94aebc7f1198ae44726affa))
* lint chore ([#308](https://github.com/this-oliver/this-oliver/issues/308)) ([9b88f38](https://github.com/this-oliver/this-oliver/commit/9b88f384335aa8c7191df690ba010b01656c228c))

## [4.0.0](https://github.com/this-oliver/this-oliver/compare/3.3.18...v4.0.0) (2025-09-01)


### ⚠ BREAKING CHANGES

* adds back dedicated backend directory ([#269](https://github.com/this-oliver/this-oliver/issues/269))
* refactors repo with focus on frontend ([#255](https://github.com/this-oliver/this-oliver/issues/255))

### Features

* (front) adds publication status filter (v3.7.0) ([2b50ea8](https://github.com/this-oliver/this-oliver/commit/2b50ea8d16f1aa4637758d67e96c518e025287e8))
* (front) adds search field for baselist (v3.8.0) ([126a518](https://github.com/this-oliver/this-oliver/commit/126a5189354ee9c77b396096f0ad22707ba4481b))
* (front) generates `NoteCard` color based on note title (v3.4.0) ([0d58fd0](https://github.com/this-oliver/this-oliver/commit/0d58fd0904c51f6948888bbaefd8b1b613ead0d5))
* adds a now page (v3.6.0) ([2c77eac](https://github.com/this-oliver/this-oliver/commit/2c77eacecb21d25eb1ed1c47f9088d5d5f64eaa7))
* adds thesis page and patches components (v3.5.0) ([75392df](https://github.com/this-oliver/this-oliver/commit/75392df78009b46b61d83a0569c8459d1e5f9404))
* **backend:** swaps custom cms for strapi ([#248](https://github.com/this-oliver/this-oliver/issues/248)) ([3072fe9](https://github.com/this-oliver/this-oliver/commit/3072fe90ef75db0ecbc7a951c780c30199aea660))
* **frontend:** adds ui feedback to note filters ([#265](https://github.com/this-oliver/this-oliver/issues/265)) ([ec6cc2d](https://github.com/this-oliver/this-oliver/commit/ec6cc2dd9f178ad5738bb0ce7652e96a4213b908))
* **frontend:** fetch notes on scroll ([#285](https://github.com/this-oliver/this-oliver/issues/285)) ([f1042cf](https://github.com/this-oliver/this-oliver/commit/f1042cf1f56d06d9d2b3fe403f07eff686f29e01))
* **frontend:** filter notes by title, content and tags ([#292](https://github.com/this-oliver/this-oliver/issues/292)) ([701bb56](https://github.com/this-oliver/this-oliver/commit/701bb56f295f1808d7ea6b32da7e593b5654ffb5))
* **frontend:** replaces vuetify with tailwind ([#247](https://github.com/this-oliver/this-oliver/issues/247)) ([8064c93](https://github.com/this-oliver/this-oliver/commit/8064c9348efbc8997faf01d036d34ab4f993f190))
* touches up notes with rothko-js (v3.9.0) ([a8d6b0d](https://github.com/this-oliver/this-oliver/commit/a8d6b0d96b18c8154160c6d5f7b52d2f1d3a0266))


### Bug Fixes

* (front) alignment of columns in thesis page (v3.6.2) ([e1aab90](https://github.com/this-oliver/this-oliver/commit/e1aab90138943e22cf5e6fd7e830756c41a7d6b8))
* (front) content preview was overflowing outside of container (v3.4.3) ([b79f725](https://github.com/this-oliver/this-oliver/commit/b79f725ffa8ab12d58329f5af47fe3e69f91b197))
* (front) links are hard to read in dark mode (v3.4.1) ([2a179c3](https://github.com/this-oliver/this-oliver/commit/2a179c30590d9912e4246883b7222cc8408d3d00))
* (front) sidebars were acting crazy (v3.4.2) ([e97bf64](https://github.com/this-oliver/this-oliver/commit/e97bf64be85ae3e96a1f999a038a323fe0bd6c82))
* adds back dedicated backend directory ([#269](https://github.com/this-oliver/this-oliver/issues/269)) ([85b8864](https://github.com/this-oliver/this-oliver/commit/85b886410a8753d45e71d021499ecd7dd66cf62b))
* analytic plugin failing ([#260](https://github.com/this-oliver/this-oliver/issues/260)) ([75055f3](https://github.com/this-oliver/this-oliver/commit/75055f306c5a1e2f68f2dc99729e9b2e105d4a94))
* **backend:** always run docker image in production mode ([#289](https://github.com/this-oliver/this-oliver/issues/289)) ([f92cc9d](https://github.com/this-oliver/this-oliver/commit/f92cc9d485c8ea7eee2bd6f9d232e48aa8a1e80b))
* **backend:** dockerfile not building admin portal ([#291](https://github.com/this-oliver/this-oliver/issues/291)) ([47654ba](https://github.com/this-oliver/this-oliver/commit/47654baa97f2318eee45fd3bdc2fc563b7bba086))
* **backend:** makes label unique and required to create a tag ([#287](https://github.com/this-oliver/this-oliver/issues/287)) ([4f6cb44](https://github.com/this-oliver/this-oliver/commit/4f6cb4452b6165fd6a714ff83a090bad1f821617))
* **backend:** removes copy line in dockerfile for deleted entrypoint … ([#290](https://github.com/this-oliver/this-oliver/issues/290)) ([2fe1c25](https://github.com/this-oliver/this-oliver/commit/2fe1c2512786bbf906d211373fb096479d712fe5))
* **backend:** removes copy line in dockerfile for deleted entrypoint script ([2fe1c25](https://github.com/this-oliver/this-oliver/commit/2fe1c2512786bbf906d211373fb096479d712fe5))
* **backend:** removes unecessary publishing flag from note data structure ([319cf38](https://github.com/this-oliver/this-oliver/commit/319cf38cfd27c771bdbc756ad5278829287d431e))
* **backend:** removes unecessary publishing flag from note data structure ([#266](https://github.com/this-oliver/this-oliver/issues/266)) ([319cf38](https://github.com/this-oliver/this-oliver/commit/319cf38cfd27c771bdbc756ad5278829287d431e))
* **cicd:** stop building/deploying for removed backend ([#257](https://github.com/this-oliver/this-oliver/issues/257)) ([deb51b2](https://github.com/this-oliver/this-oliver/commit/deb51b26c0ea7c86a36324c30c79356fbc22b0eb))
* **cicd:** updates release job in cd to release for node projects ([#256](https://github.com/this-oliver/this-oliver/issues/256)) ([904e371](https://github.com/this-oliver/this-oliver/commit/904e37134bb733f111661d43662161d16e8013a1))
* **frontend:** adds custom tailwind colors for primary and secondary … ([#263](https://github.com/this-oliver/this-oliver/issues/263)) ([60fce1f](https://github.com/this-oliver/this-oliver/commit/60fce1fc03772cfaf167ab779e5ab12def653394))
* **frontend:** adds custom tailwind colors for primary and secondary sttyles ([60fce1f](https://github.com/this-oliver/this-oliver/commit/60fce1fc03772cfaf167ab779e5ab12def653394))
* **frontend:** adds error handling page and sets ssr errors to 'fatal' ([#303](https://github.com/this-oliver/this-oliver/issues/303)) ([60a3794](https://github.com/this-oliver/this-oliver/commit/60a3794943a44e150a2444c59cfbade78e83a05f))
* **frontend:** broken responsiveness to small screens ([#264](https://github.com/this-oliver/this-oliver/issues/264)) ([3f2058e](https://github.com/this-oliver/this-oliver/commit/3f2058e7d02126f0b116773b31bef00269494dd1))
* **frontend:** disables deprecated marked features ([#277](https://github.com/this-oliver/this-oliver/issues/277)) ([35a5191](https://github.com/this-oliver/this-oliver/commit/35a519171d9f3817e012633b1afa4191895af078))
* **frontend:** import.meta crashing in production ([#282](https://github.com/this-oliver/this-oliver/issues/282)) ([dbbc26a](https://github.com/this-oliver/this-oliver/commit/dbbc26addbb0d860b7653f92a03a35b213d62181))
* **frontend:** improves data fetching and removes notes/xp pinia stores ([#278](https://github.com/this-oliver/this-oliver/issues/278)) ([32136b2](https://github.com/this-oliver/this-oliver/commit/32136b278c50dcf1f5a8dc969422ca2fb54902a4))
* **frontend:** improves error-handling ([#279](https://github.com/this-oliver/this-oliver/issues/279)) ([a913ea4](https://github.com/this-oliver/this-oliver/commit/a913ea4a7377d3970d1bf707d47d00f7781fa0c4))
* **frontend:** makes single note page narrow for large screens ([#261](https://github.com/this-oliver/this-oliver/issues/261)) ([1bdcec0](https://github.com/this-oliver/this-oliver/commit/1bdcec0ddf8cde28d204bb6f5af3c93207d32c65))
* **frontend:** nuxt server leaking memory when .env variables not loaded ([#281](https://github.com/this-oliver/this-oliver/issues/281)) ([1efcf08](https://github.com/this-oliver/this-oliver/commit/1efcf08d14d16ec054d4d28fed86c8316fb8ea5c))
* **frontend:** referencing store that is removed ([#283](https://github.com/this-oliver/this-oliver/issues/283)) ([d1c0af3](https://github.com/this-oliver/this-oliver/commit/d1c0af3297da3ee275fc0b46e4034e06742b3fe9))
* **frontend:** removes baselist ([#259](https://github.com/this-oliver/this-oliver/issues/259)) ([f2c9090](https://github.com/this-oliver/this-oliver/commit/f2c90902891b277955ed94dc9b60a86310a408b9))
* **frontend:** rothko card crashing server (ssr) when loaded ([#254](https://github.com/this-oliver/this-oliver/issues/254)) ([8d11b1a](https://github.com/this-oliver/this-oliver/commit/8d11b1aff1903b7b6321087dfa75c369e0a3d277))
* **frontend:** show experience dates in a pretty format ([#294](https://github.com/this-oliver/this-oliver/issues/294)) ([ef5c022](https://github.com/this-oliver/this-oliver/commit/ef5c02298b7f6e4406a68b07490a5d2c8deedd4d))
* **frontend:** simplifies setup for simple analytics plugin ([#249](https://github.com/this-oliver/this-oliver/issues/249)) ([b651385](https://github.com/this-oliver/this-oliver/commit/b651385a12413b199c2c1263a783bc3eeffcddb7))
* **frontend:** spelling typo for website.socials ([#280](https://github.com/this-oliver/this-oliver/issues/280)) ([d8b82eb](https://github.com/this-oliver/this-oliver/commit/d8b82ebdc7b7146ced62e3e242ad8c669b5b6a26))
* **frontend:** updates dockerfile and docker compose files for new dir structure ([#253](https://github.com/this-oliver/this-oliver/issues/253)) ([eddeff4](https://github.com/this-oliver/this-oliver/commit/eddeff471547aacac6545ec7697d0969620d3574))
* **frontend:** updates nuxt ([#245](https://github.com/this-oliver/this-oliver/issues/245)) ([3d16682](https://github.com/this-oliver/this-oliver/commit/3d16682062087809cd1df10f74b98b8878da218d))
* **frontend:** updates nuxt to latest version ([3d16682](https://github.com/this-oliver/this-oliver/commit/3d16682062087809cd1df10f74b98b8878da218d))
* **frontend:** updates nuxt version ([#276](https://github.com/this-oliver/this-oliver/issues/276)) ([fe691ff](https://github.com/this-oliver/this-oliver/commit/fe691ffb0625637e30fc0f2700fff529ab159277))
* migrates user model ([#202](https://github.com/this-oliver/this-oliver/issues/202)) (v3.4.6) ([6d9d344](https://github.com/this-oliver/this-oliver/commit/6d9d3441783247a0699f3663c68c13701c43bc92))
* re-introduces note tags ([#262](https://github.com/this-oliver/this-oliver/issues/262)) ([159f126](https://github.com/this-oliver/this-oliver/commit/159f126128a78b323997fb32309da327bb9ff0ac))
* refactors repo with focus on frontend ([931ba6f](https://github.com/this-oliver/this-oliver/commit/931ba6fc068db25bb8f9317631507b812276d89e))
* refactors repo with focus on frontend ([#255](https://github.com/this-oliver/this-oliver/issues/255)) ([931ba6f](https://github.com/this-oliver/this-oliver/commit/931ba6fc068db25bb8f9317631507b812276d89e))
* security check not exiting on vulnerability ([#230](https://github.com/this-oliver/this-oliver/issues/230)) ([e0ea5d5](https://github.com/this-oliver/this-oliver/commit/e0ea5d59899a545b4b7ed6aab313d0a53c3495ae))
* **security:** updates dependabot config ([#284](https://github.com/this-oliver/this-oliver/issues/284)) ([12fd10c](https://github.com/this-oliver/this-oliver/commit/12fd10c465d1826536efeeaf8c78ae654d8261f9))
* typos in thesis page (v3.6.1) ([01f0f73](https://github.com/this-oliver/this-oliver/commit/01f0f73a5ba64cd26a890535a18a761bd33423b4))
