<img src="https://i.giphy.com/media/SK92U8rnhWWx80duDn/giphy.webp" style="width:100%" />

# Voucher World

2D multiplayer voucher collection game. Like Mecenat but interactive.

# Installation

1. Clone the repository
    - `git clone https://github.com/theo0165/voucher-world`
    - `cd voucher-world`
2. Install dependencies
    - `npm install`
    - This can be done in the root of the project.
3. Set up database
    - Create a supabase project
    - Make a database with the following tables
        - store
            - name - varchar
            - primary_color - varchar
            - secondary_color - varchar
            - logo - varchar
        - voucher
            - store_id - foreign key -> store.id
            - value - varchar
            - startDate - date
            - endDate - date
            - link - varchar
4. Add varibles to environment file
    - Don't forget to rename the .env.example to .env
5. Start the server and client
    - `npm run dev`
6. Join the game and have fun

# Changelog

-   [#1 - Setup react boilerplate.](https://github.com/theo0165/voucher-world/pull/1)
-   [#2 - Setup express.js boilerplate](https://github.com/theo0165/voucher-world/pull/2)
-   [#3 - Update changelog links](https://github.com/theo0165/voucher-world/pull/3)
-   [#4 - Change file structure](https://github.com/theo0165/voucher-world/pull/4)
-   [#5 - Basic classes (player and game). Move player. Eslint.](https://github.com/theo0165/voucher-world/pull/5)
-   [#6 - Add supabase + basic GET api](https://github.com/theo0165/voucher-world/pull/6)
-   [#7 - Add character animation and size character correctly](https://github.com/theo0165/voucher-world/pull/7)
-   [#8 - Basic multiplayer support](https://github.com/theo0165/voucher-world/pull/8)
-   [#9 - Add test map (start and mid)](https://github.com/theo0165/voucher-world/pull/9)
-   [#10 - Make game fullscreen and position absolute](https://github.com/theo0165/voucher-world/pull/10)
-   [#11 - Generate map based on the amount of stores in the database](https://github.com/theo0165/voucher-world/pull/11)
-   [#12 - Add correct z-index for container children + cleanup](https://github.com/theo0165/voucher-world/pull/12)
-   [#13 - Add preloader for assets + preloading screen](https://github.com/theo0165/voucher-world/pull/13)
-   [#14 - Add debug info when in dev mode, change size of loading screen](https://github.com/theo0165/voucher-world/pull/14)
-   [#15 - Fix bug where game reloaded when pressing spacebar](https://github.com/theo0165/voucher-world/pull/15)
-   [#16 - Homepage](https://github.com/theo0165/voucher-world/pull/16)
-   [#17 - Update background + generate houses](https://github.com/theo0165/voucher-world/pull/17)
-   [#18 - Collision with houses and map borders](https://github.com/theo0165/voucher-world/pull/18)
-   [#19 - Display vouchers](https://github.com/theo0165/voucher-world/pull/19)
-   [#20 - Deploy](https://github.com/theo0165/voucher-world/pull/20)
-   [#21 - Update procfile](https://github.com/theo0165/voucher-world/pull/21)
-   [#22 - Make typescript prod dependency](https://github.com/theo0165/voucher-world/pull/22)
-   [#23 - Add @types to prod dependencies](https://github.com/theo0165/voucher-world/pull/23)
-   [#24 - Vercel clean urls](https://github.com/theo0165/voucher-world/pull/24)
-   [#25 - Update changelog with new pull requests](https://github.com/theo0165/voucher-world/pull/25)
-   [#26 - Add cors on production + bug fixes/cleanup](https://github.com/theo0165/voucher-world/pull/26)
-   [#27 - Code review](https://github.com/theo0165/voucher-world/pull/27)
-   [#28 - Update env prefix for cors](https://github.com/theo0165/voucher-world/pull/28)
-   [#30 - Fix logo size + transparent background](https://github.com/theo0165/voucher-world/pull/30)
-   [#31 - Add license, update readme, update api result](https://github.com/theo0165/voucher-world/pull/31)
-   [#32 - Add gif](https://github.com/theo0165/voucher-world/pull/32)

# Code Review

1. `General` - Do not forget to add a LICENSE to your project for copyright protection.
2. `.env.example` - Instead of displaying your values here you can add those values into the installations description.
3. `README.md` - Readme file has not been filled in with installation description and testers, this is one of the criteria so don’t forget to do this.
4. `General` - The project generated an error saying that the favicon couldn’t load.
5. `General` - To make the game more user friendly perhaps add some more instructions on how to play the game.
6. `General` - We were not able to redeem any vouchers, perhaps have look at that.
7. `index.ts:3` - You use descriptive variable names so this comment is unnecessary.
8. `Game.ts:54`- Remember to remove code that is not in use.
9. `voucher.ts:21-23` - Remember to remove the comments on rows from 21 to 23.
10. `Praise` - Overall great job. We enjoyed playing your game! You have a good file structure and descriptive variable names.

# Testers

Tested by the following people:

1. Neo Lejondahl
2. Simon Helier
3. Christopher Michael
4. Hans Andersson

Tested by the following muggles (non-coders):

1. Christina Sandell
2. Jörgen Sandell
3. Caroline Staaf
4. Theodore Staaf
