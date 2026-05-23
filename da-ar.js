
    (function() {
      var arMood = null, arLen = null;

      var arDB = {
        action: {
          short: [
            { title:'Demon Slayer', genre:'Shonen', desc:'A boy becomes a demon slayer to avenge his family. Stunning animation, iconic fights.', rating:'&#11088; 9.1', watch:'https://www.crunchyroll.com/demon-slayer-kimetsu-no-yaiba', merch:'https://www.amazon.com/s?k=demon+slayer+merch&tag=priscadezigns-20' },
            { title:'Jujutsu Kaisen', genre:'Shonen', desc:'A student swallows a cursed finger and joins a school of curse-fighting sorcerers.', rating:'&#11088; 8.7', watch:'https://www.crunchyroll.com/jujutsu-kaisen', merch:'https://www.amazon.com/s?k=jujutsu+kaisen+merch&tag=priscadezigns-20' },
            { title:'Haikyuu!!', genre:'Sports', desc:'A short teen defies the odds to become a volleyball ace. Pure hype, pure heart.', rating:'&#11088; 8.7', watch:'https://www.crunchyroll.com/haikyu', merch:'https://www.amazon.com/s?k=haikyuu+merch&tag=priscadezigns-20' },
            { title:'Mob Psycho 100', genre:'Action', desc:'A psychic middle schooler tries to suppress his godlike powers. Visually explosive.', rating:'&#11088; 8.8', watch:'https://www.crunchyroll.com/mob-psycho-100', merch:'https://www.amazon.com/s?k=mob+psycho+100+merch&tag=priscadezigns-20' }
          ],
          mid: [
            { title:'Attack on Titan', genre:'Dark Action', desc:'Humanity fights for survival against giant man-eating titans behind crumbling walls.', rating:'&#11088; 9.0', watch:'https://www.crunchyroll.com/attack-on-titan', merch:'https://www.amazon.com/s?k=attack+on+titan+merch&tag=priscadezigns-20' },
            { title:'My Hero Academia', genre:'Shonen', desc:'In a world of superpowers, a powerless boy trains to become the greatest hero.', rating:'&#11088; 8.4', watch:'https://www.crunchyroll.com/my-hero-academia', merch:'https://www.amazon.com/s?k=my+hero+academia+merch&tag=priscadezigns-20' },
            { title:'Bleach', genre:'Shonen', desc:'A teen gains Soul Reaper powers and battles hollows threatening the living world.', rating:'&#11088; 8.2', watch:'https://www.crunchyroll.com/bleach', merch:'https://www.amazon.com/s?k=bleach+anime+merch&tag=priscadezigns-20' }
          ],
          epic: [
            { title:'Naruto', genre:'Shonen', desc:'An orphan ninja dreams of becoming Hokage. Decades of friendship, growth and war.', rating:'&#11088; 8.3', watch:'https://www.crunchyroll.com/naruto', merch:'https://www.amazon.com/s?k=naruto+merch&tag=priscadezigns-20' },
            { title:'One Piece', genre:'Adventure', desc:'A rubber-bodied pirate and his crew sail for the ultimate treasure, the One Piece.', rating:'&#11088; 9.0', watch:'https://www.crunchyroll.com/one-piece', merch:'https://www.amazon.com/s?k=one+piece+merch&tag=priscadezigns-20' },
            { title:'Dragon Ball Z', genre:'Shonen', desc:'Saiyans, gods, and planet-busting battles. The grandfather of all anime action.', rating:'&#11088; 8.8', watch:'https://www.crunchyroll.com/dragon-ball-z', merch:'https://www.amazon.com/s?k=dragon+ball+z+merch&tag=priscadezigns-20' }
          ],
          movie: [
            { title:'Demon Slayer: Mugen Train', genre:'Action Movie', desc:'The Flame Hashira faces a demon aboard a cursed train. Emotionally devastating.', rating:'&#11088; 8.3', watch:'https://www.crunchyroll.com/demon-slayer-kimetsu-no-yaiba-the-movie-mugen-train', merch:'https://www.amazon.com/s?k=demon+slayer+mugen+train&tag=priscadezigns-20' },
            { title:'My Hero Academia: Heroes Rising', genre:'Action Movie', desc:'Class 1-A faces their ultimate villain in a heart-pounding island showdown.', rating:'&#11088; 7.9', watch:'https://www.google.com/search?q=My+Hero+Academia+Heroes+Rising+watch', merch:'https://www.amazon.com/s?k=my+hero+academia+movie&tag=priscadezigns-20' },
            { title:'Promare', genre:'Sci-Fi Action', desc:'Firefighters battle flame-wielding mutants in a neon-drenched, jaw-dropping feature film.', rating:'&#11088; 7.7', watch:'https://www.google.com/search?q=Promare+anime+movie+watch', merch:'https://www.amazon.com/s?k=promare+anime&tag=priscadezigns-20' }
          ]
        },
        emotional: {
          short: [
            { title:'Your Lie in April', genre:'Romance / Drama', desc:'A prodigy pianist rediscovers music through a free-spirited violinist. Bring tissues.', rating:'&#11088; 8.6', watch:'https://www.crunchyroll.com/your-lie-in-april', merch:'https://www.amazon.com/s?k=your+lie+in+april+merch&tag=priscadezigns-20' },
            { title:'Anohana', genre:'Drama', desc:'A ghost of a childhood friend returns to help her friends make peace with her passing.', rating:'&#11088; 8.2', watch:'https://www.crunchyroll.com/anohana-the-flower-we-saw-that-day', merch:'https://www.amazon.com/s?k=anohana+merch&tag=priscadezigns-20' },
            { title:'Clannad: After Story', genre:'Drama', desc:'Life after high school hits hard. Family, loss and love in one of anime greatest tearjerkers.', rating:'&#11088; 8.9', watch:'https://www.google.com/search?q=Clannad+After+Story+watch', merch:'https://www.amazon.com/s?k=clannad+merch&tag=priscadezigns-20' }
          ],
          mid: [
            { title:'Fullmetal Alchemist: Brotherhood', genre:'Adventure', desc:'Two brothers pay the ultimate price for alchemy and fight to get their bodies back.', rating:'&#11088; 9.1', watch:'https://www.crunchyroll.com/fullmetal-alchemist-brotherhood', merch:'https://www.amazon.com/s?k=fullmetal+alchemist+merch&tag=priscadezigns-20' },
            { title:'Violet Evergarden', genre:'Drama', desc:'A war veteran becomes a letter-writer and slowly rediscovers the meaning of love.', rating:'&#11088; 8.7', watch:'https://www.netflix.com/title/80182123', merch:'https://www.amazon.com/s?k=violet+evergarden+merch&tag=priscadezigns-20' },
            { title:'Sword Art Online', genre:'Sci-Fi RPG', desc:'Players are trapped in a VR game where death in-game means death in real life.', rating:'&#11088; 7.2', watch:'https://www.crunchyroll.com/sword-art-online', merch:'https://www.amazon.com/s?k=sword+art+online+merch&tag=priscadezigns-20' }
          ],
          epic: [
            { title:'Fullmetal Alchemist: Brotherhood', genre:'Adventure', desc:'Two brothers pay the ultimate price for alchemy and fight to get their bodies back.', rating:'&#11088; 9.1', watch:'https://www.crunchyroll.com/fullmetal-alchemist-brotherhood', merch:'https://www.amazon.com/s?k=fullmetal+alchemist+merch&tag=priscadezigns-20' },
            { title:'Steins;Gate', genre:'Sci-Fi', desc:'A self-proclaimed mad scientist accidentally invents time travel with devastating consequences.', rating:'&#11088; 9.1', watch:'https://www.crunchyroll.com/steinsgate', merch:'https://www.amazon.com/s?k=steins+gate+merch&tag=priscadezigns-20' },
            { title:'Fruits Basket', genre:'Romance', desc:'An orphaned girl moves in with the Sohma family, who each transform into a zodiac animal.', rating:'&#11088; 8.3', watch:'https://www.crunchyroll.com/fruits-basket-2019', merch:'https://www.amazon.com/s?k=fruits+basket+merch&tag=priscadezigns-20' }
          ],
          movie: [
            { title:'A Silent Voice', genre:'Drama Movie', desc:'A reformed bully reconnects with the deaf girl he tormented. Raw, honest, beautiful.', rating:'&#11088; 8.1', watch:'https://www.google.com/search?q=A+Silent+Voice+watch', merch:'https://www.amazon.com/s?k=a+silent+voice+anime&tag=priscadezigns-20' },
            { title:'Your Name', genre:'Romance Movie', desc:'Two teens mysteriously swap bodies and race against time to find each other.', rating:'&#11088; 8.4', watch:'https://www.google.com/search?q=Your+Name+anime+movie+watch', merch:'https://www.amazon.com/s?k=your+name+anime+merch&tag=priscadezigns-20' },
            { title:'Grave of the Fireflies', genre:'War Drama', desc:'Two orphaned siblings struggle to survive in wartime Japan. One of cinema saddest films.', rating:'&#11088; 8.5', watch:'https://www.google.com/search?q=Grave+of+the+Fireflies+watch', merch:'https://www.amazon.com/s?k=grave+of+the+fireflies&tag=priscadezigns-20' }
          ]
        },
        laugh: {
          short: [
            { title:'Konosuba', genre:'Comedy', desc:'A useless goddess, an explosion-obsessed mage and a masochist knight go on hopeless quests.', rating:'&#11088; 8.4', watch:'https://www.crunchyroll.com/konosuba-gods-blessing-on-this-wonderful-world', merch:'https://www.amazon.com/s?k=konosuba+merch&tag=priscadezigns-20' },
            { title:'Daily Lives of High School Boys', genre:'Comedy', desc:'Three idiots doing absolutely nothing useful. Painfully relatable and endlessly funny.', rating:'&#11088; 8.1', watch:'https://www.crunchyroll.com/daily-lives-of-high-school-boys', merch:'https://www.amazon.com/s?k=daily+lives+high+school+boys+anime&tag=priscadezigns-20' },
            { title:'One Punch Man', genre:'Action Comedy', desc:'The strongest hero alive is bored to death because no one can challenge him.', rating:'&#11088; 8.8', watch:'https://www.crunchyroll.com/one-punch-man', merch:'https://www.amazon.com/s?k=one+punch+man+merch&tag=priscadezigns-20' }
          ],
          mid: [
            { title:'Gintama', genre:'Comedy', desc:'A lazy samurai in alien-occupied Edo fights weird jobs. The funniest anime ever made.', rating:'&#11088; 9.0', watch:'https://www.crunchyroll.com/gintama', merch:'https://www.amazon.com/s?k=gintama+merch&tag=priscadezigns-20' },
            { title:'Grand Blue', genre:'Comedy', desc:'A college student joins a diving club but mostly gets drunk and does stupid things.', rating:'&#11088; 8.3', watch:'https://www.google.com/search?q=Grand+Blue+anime+watch', merch:'https://www.amazon.com/s?k=grand+blue+anime&tag=priscadezigns-20' },
            { title:'Ouran High School Host Club', genre:'Romantic Comedy', desc:'A scholarship girl accidentally joins an elite host club and has to pay off her debt.', rating:'&#11088; 8.2', watch:'https://www.crunchyroll.com/ouran-high-school-host-club', merch:'https://www.amazon.com/s?k=ouran+host+club+merch&tag=priscadezigns-20' }
          ],
          epic: [
            { title:'Gintama', genre:'Comedy', desc:'A lazy samurai in alien-occupied Edo fights weird jobs. The funniest anime ever made.', rating:'&#11088; 9.0', watch:'https://www.crunchyroll.com/gintama', merch:'https://www.amazon.com/s?k=gintama+merch&tag=priscadezigns-20' },
            { title:'Fairy Tail', genre:'Adventure Comedy', desc:'A girl joins a rowdy wizard guild and embarks on wild, heartwarming adventures.', rating:'&#11088; 8.0', watch:'https://www.crunchyroll.com/fairy-tail', merch:'https://www.amazon.com/s?k=fairy+tail+merch&tag=priscadezigns-20' },
            { title:'Ranma 1/2', genre:'Comedy', desc:'A martial artist turns into a girl when splashed with cold water. Chaos ensues.', rating:'&#11088; 7.9', watch:'https://www.google.com/search?q=Ranma+1+2+anime+watch', merch:'https://www.amazon.com/s?k=ranma+anime+merch&tag=priscadezigns-20' }
          ],
          movie: [
            { title:'Konosuba: Crystal of Darkness', genre:'Comedy Movie', desc:'The gang hits the road in their most ridiculous adventure yet. Pure comedic chaos.', rating:'&#11088; 8.0', watch:'https://www.google.com/search?q=Konosuba+movie+watch', merch:'https://www.amazon.com/s?k=konosuba+merch&tag=priscadezigns-20' },
            { title:'One Punch Man OVAs', genre:'Comedy OVA', desc:'Bonus episodes of Saitama gloriously boring heroic life. Hilarious extras.', rating:'&#11088; 8.5', watch:'https://www.crunchyroll.com/one-punch-man', merch:'https://www.amazon.com/s?k=one+punch+man+merch&tag=priscadezigns-20' },
            { title:'Summer Wars', genre:'Sci-Fi Comedy', desc:'A math nerd visits his crush family and accidentally triggers a global digital catastrophe.', rating:'&#11088; 7.8', watch:'https://www.google.com/search?q=Summer+Wars+anime+watch', merch:'https://www.amazon.com/s?k=summer+wars+anime&tag=priscadezigns-20' }
          ]
        },
        deep: {
          short: [
            { title:'Death Note', genre:'Psychological Thriller', desc:'A teen finds a notebook that kills anyone whose name is written in it. Cat and mouse perfection.', rating:'&#11088; 8.6', watch:'https://www.crunchyroll.com/death-note', merch:'https://www.amazon.com/s?k=death+note+merch&tag=priscadezigns-20' },
            { title:'The Promised Neverland', genre:'Thriller', desc:'Orphans discover a dark secret about their home and plot a desperate escape.', rating:'&#11088; 8.6', watch:'https://www.crunchyroll.com/the-promised-neverland', merch:'https://www.amazon.com/s?k=promised+neverland+merch&tag=priscadezigns-20' },
            { title:'Erased', genre:'Mystery', desc:'A man travels back in time to his childhood to prevent the murder of a classmate.', rating:'&#11088; 8.5', watch:'https://www.crunchyroll.com/erased', merch:'https://www.amazon.com/s?k=erased+anime+boku+dake&tag=priscadezigns-20' }
          ],
          mid: [
            { title:'Steins;Gate', genre:'Sci-Fi', desc:'A self-proclaimed mad scientist accidentally invents time travel with devastating consequences.', rating:'&#11088; 9.1', watch:'https://www.crunchyroll.com/steinsgate', merch:'https://www.amazon.com/s?k=steins+gate+merch&tag=priscadezigns-20' },
            { title:'Code Geass', genre:'Mecha / Political', desc:'An exiled prince gains mind-control powers and starts a revolution. Chess meets mecha warfare.', rating:'&#11088; 8.7', watch:'https://www.crunchyroll.com/code-geass-lelouch-of-the-rebellion', merch:'https://www.amazon.com/s?k=code+geass+merch&tag=priscadezigns-20' },
            { title:'Neon Genesis Evangelion', genre:'Psychological Mecha', desc:'Giant robots, psychological breakdowns, and existential dread. A genre-defining masterpiece.', rating:'&#11088; 8.5', watch:'https://www.netflix.com/title/81033445', merch:'https://www.amazon.com/s?k=evangelion+merch&tag=priscadezigns-20' }
          ],
          epic: [
            { title:'Monster', genre:'Psychological Thriller', desc:'A surgeon saves a boy who grows up to become a serial killer. A relentless moral chase.', rating:'&#11088; 9.0', watch:'https://www.crunchyroll.com/monster', merch:'https://www.amazon.com/s?k=monster+anime+naoki+urasawa&tag=priscadezigns-20' },
            { title:'Code Geass', genre:'Mecha / Political', desc:'An exiled prince gains mind-control powers and starts a revolution. Chess meets mecha warfare.', rating:'&#11088; 8.7', watch:'https://www.crunchyroll.com/code-geass-lelouch-of-the-rebellion', merch:'https://www.amazon.com/s?k=code+geass+merch&tag=priscadezigns-20' },
            { title:'Steins;Gate', genre:'Sci-Fi', desc:'A self-proclaimed mad scientist accidentally invents time travel with devastating consequences.', rating:'&#11088; 9.1', watch:'https://www.crunchyroll.com/steinsgate', merch:'https://www.amazon.com/s?k=steins+gate+merch&tag=priscadezigns-20' }
          ],
          movie: [
            { title:'Paprika', genre:'Psychological Movie', desc:'A device that allows therapists to enter dreams is stolen. Reality begins to collapse.', rating:'&#11088; 7.7', watch:'https://www.google.com/search?q=Paprika+anime+movie+watch', merch:'https://www.amazon.com/s?k=paprika+satoshi+kon+anime&tag=priscadezigns-20' },
            { title:'Perfect Blue', genre:'Psychological Thriller', desc:'A pop idol turned actress is stalked as her grip on reality begins to unravel.', rating:'&#11088; 8.0', watch:'https://www.google.com/search?q=Perfect+Blue+anime+movie+watch', merch:'https://www.amazon.com/s?k=perfect+blue+anime&tag=priscadezigns-20' },
            { title:'Ghost in the Shell', genre:'Sci-Fi Movie', desc:'In a cyberpunk future, a cyborg cop questions what it means to be human.', rating:'&#11088; 8.0', watch:'https://www.google.com/search?q=Ghost+in+the+Shell+1995+watch', merch:'https://www.amazon.com/s?k=ghost+in+the+shell+merch&tag=priscadezigns-20' }
          ]
        },
        cosy: {
          short: [
            { title:'Barakamon', genre:'Slice of Life', desc:'A stressed calligrapher moves to a rural island and rediscovers joy through a wild little girl.', rating:'&#11088; 8.3', watch:'https://www.crunchyroll.com/barakamon', merch:'https://www.amazon.com/s?k=barakamon+anime&tag=priscadezigns-20' },
            { title:'Natsume Book of Friends', genre:'Supernatural', desc:'A boy who sees spirits inherits his grandmother book of spirit names. Gentle and healing.', rating:'&#11088; 8.5', watch:'https://www.crunchyroll.com/natsumes-book-of-friends', merch:'https://www.amazon.com/s?k=natsume+book+of+friends+merch&tag=priscadezigns-20' },
            { title:'Laid-Back Camp', genre:'Slice of Life', desc:'Girls camp in stunning landscapes, cook outdoors, and find peace in simple pleasures.', rating:'&#11088; 8.1', watch:'https://www.crunchyroll.com/laid-back-camp', merch:'https://www.amazon.com/s?k=laid+back+camp+anime&tag=priscadezigns-20' }
          ],
          mid: [
            { title:'Fruits Basket', genre:'Romance', desc:'An orphaned girl moves in with the Sohma family, who each transform into a zodiac animal.', rating:'&#11088; 8.3', watch:'https://www.crunchyroll.com/fruits-basket-2019', merch:'https://www.amazon.com/s?k=fruits+basket+merch&tag=priscadezigns-20' },
            { title:'Sweetness and Lightning', genre:'Slice of Life', desc:'A single dad learns to cook so he can share proper meals with his little daughter.', rating:'&#11088; 7.9', watch:'https://www.crunchyroll.com/sweetness-and-lightning', merch:'https://www.amazon.com/s?k=sweetness+and+lightning+anime&tag=priscadezigns-20' },
            { title:'Yotsuba', genre:'Slice of Life', desc:'A cheerful green-haired girl discovers the joys of everyday life with infectious wonder.', rating:'&#11088; 8.6', watch:'https://www.google.com/search?q=Yotsuba+anime+watch', merch:'https://www.amazon.com/s?k=yotsuba+manga+merch&tag=priscadezigns-20' }
          ],
          epic: [
            { title:'Fruits Basket', genre:'Romance', desc:'An orphaned girl moves in with the Sohma family, who each transform into a zodiac animal.', rating:'&#11088; 8.3', watch:'https://www.crunchyroll.com/fruits-basket-2019', merch:'https://www.amazon.com/s?k=fruits+basket+merch&tag=priscadezigns-20' },
            { title:'Cardcaptor Sakura', genre:'Magical Girl', desc:'A girl discovers magical cards and must recapture them all. Warm, whimsical perfection.', rating:'&#11088; 8.0', watch:'https://www.crunchyroll.com/cardcaptor-sakura', merch:'https://www.amazon.com/s?k=cardcaptor+sakura+merch&tag=priscadezigns-20' },
            { title:'My Neighbor Totoro', genre:'Fantasy', desc:'Two sisters befriend a giant forest spirit in rural Japan. Pure, timeless Ghibli warmth.', rating:'&#11088; 8.1', watch:'https://www.google.com/search?q=My+Neighbor+Totoro+watch', merch:'https://www.amazon.com/s?k=totoro+merch&tag=priscadezigns-20' }
          ],
          movie: [
            { title:'Spirited Away', genre:'Fantasy Movie', desc:'A girl enters the spirit world to rescue her parents. Studio Ghibli greatest masterpiece.', rating:'&#11088; 8.6', watch:'https://www.google.com/search?q=Spirited+Away+watch', merch:'https://www.amazon.com/s?k=spirited+away+merch&tag=priscadezigns-20' },
            { title:'My Neighbor Totoro', genre:'Fantasy', desc:'Two sisters befriend a giant forest spirit in rural Japan. Pure, timeless Ghibli warmth.', rating:'&#11088; 8.1', watch:'https://www.google.com/search?q=My+Neighbor+Totoro+watch', merch:'https://www.amazon.com/s?k=totoro+merch&tag=priscadezigns-20' },
            { title:'Wolf Children', genre:'Fantasy Drama', desc:'A mother raises her half-wolf children alone. Tender, magical and quietly devastating.', rating:'&#11088; 8.1', watch:'https://www.google.com/search?q=Wolf+Children+anime+watch', merch:'https://www.amazon.com/s?k=wolf+children+anime&tag=priscadezigns-20' }
          ]
        },
        dark: {
          short: [
            { title:'Tokyo Ghoul', genre:'Dark Fantasy', desc:'A college student becomes half-ghoul and must survive in a world that hunts his kind.', rating:'&#11088; 7.9', watch:'https://www.crunchyroll.com/tokyo-ghoul', merch:'https://www.amazon.com/s?k=tokyo+ghoul+merch&tag=priscadezigns-20' },
            { title:'Parasyte', genre:'Horror / Sci-Fi', desc:'Alien parasites invade Earth. One bonds with a teen hand instead of his brain.', rating:'&#11088; 8.4', watch:'https://www.crunchyroll.com/parasyte-the-maxim', merch:'https://www.amazon.com/s?k=parasyte+anime+merch&tag=priscadezigns-20' },
            { title:'Elfen Lied', genre:'Dark Sci-Fi', desc:'A mutant girl with telekinetic arms escapes a research facility. Brutal and heartbreaking.', rating:'&#11088; 7.5', watch:'https://www.google.com/search?q=Elfen+Lied+anime+watch', merch:'https://www.amazon.com/s?k=elfen+lied+anime&tag=priscadezigns-20' }
          ],
          mid: [
            { title:'Attack on Titan', genre:'Dark Action', desc:'Humanity fights for survival against giant man-eating titans behind crumbling walls.', rating:'&#11088; 9.0', watch:'https://www.crunchyroll.com/attack-on-titan', merch:'https://www.amazon.com/s?k=attack+on+titan+merch&tag=priscadezigns-20' },
            { title:'Vinland Saga', genre:'Historical Dark', desc:'A Viking boy seeks revenge across brutal medieval Europe. Stunning and emotionally complex.', rating:'&#11088; 8.8', watch:'https://www.crunchyroll.com/vinland-saga', merch:'https://www.amazon.com/s?k=vinland+saga+merch&tag=priscadezigns-20' },
            { title:'Made in Abyss', genre:'Dark Adventure', desc:'A girl descends into a mysterious abyss to find her mother. Terrifying beauty awaits.', rating:'&#11088; 8.7', watch:'https://www.crunchyroll.com/made-in-abyss', merch:'https://www.amazon.com/s?k=made+in+abyss+merch&tag=priscadezigns-20' }
          ],
          epic: [
            { title:'Berserk', genre:'Dark Fantasy', desc:'A lone mercenary wields a massive sword through a brutal, nightmarish medieval world.', rating:'&#11088; 8.7', watch:'https://www.crunchyroll.com/berserk', merch:'https://www.amazon.com/s?k=berserk+anime+merch&tag=priscadezigns-20' },
            { title:'Vinland Saga', genre:'Historical Dark', desc:'A Viking boy seeks revenge across brutal medieval Europe. Stunning and emotionally complex.', rating:'&#11088; 8.8', watch:'https://www.crunchyroll.com/vinland-saga', merch:'https://www.amazon.com/s?k=vinland+saga+merch&tag=priscadezigns-20' },
            { title:'Attack on Titan', genre:'Dark Action', desc:'Humanity fights for survival against giant man-eating titans behind crumbling walls.', rating:'&#11088; 9.0', watch:'https://www.crunchyroll.com/attack-on-titan', merch:'https://www.amazon.com/s?k=attack+on+titan+merch&tag=priscadezigns-20' }
          ],
          movie: [
            { title:'Akira', genre:'Sci-Fi Movie', desc:'Biker gangs, psychic powers, and a city on the edge of apocalypse. A cyberpunk icon.', rating:'&#11088; 8.0', watch:'https://www.google.com/search?q=Akira+1988+anime+movie+watch', merch:'https://www.amazon.com/s?k=akira+anime+merch&tag=priscadezigns-20' },
            { title:'Ninja Scroll', genre:'Dark Action Movie', desc:'A wandering swordsman battles eight demons. Visceral, stylish and unforgettably dark.', rating:'&#11088; 7.9', watch:'https://www.google.com/search?q=Ninja+Scroll+anime+watch', merch:'https://www.amazon.com/s?k=ninja+scroll+anime&tag=priscadezigns-20' },
            { title:'Princess Mononoke', genre:'Dark Fantasy Movie', desc:'A cursed warrior seeks a cure in a war between industrial humans and ancient forest gods.', rating:'&#11088; 8.4', watch:'https://www.google.com/search?q=Princess+Mononoke+watch', merch:'https://www.amazon.com/s?k=princess+mononoke+merch&tag=priscadezigns-20' }
          ]
        }
      };

      window.arSelectMood = function(btn) {
        document.querySelectorAll('.ar-mood-btn').forEach(function(b){ b.classList.remove('selected'); });
        btn.classList.add('selected');
        arMood = btn.getAttribute('data-mood');
        var next = document.getElementById('ar-next1');
        next.style.opacity = '1';
        next.style.pointerEvents = 'auto';
      };

      window.arSelectLen = function(btn) {
        document.querySelectorAll('.ar-len-btn').forEach(function(b){ b.classList.remove('selected'); });
        btn.classList.add('selected');
        arLen = btn.getAttribute('data-len');
        var next = document.getElementById('ar-next2');
        next.style.opacity = '1';
        next.style.pointerEvents = 'auto';
      };

      function arSetStep(n) {
        ['ar-step1','ar-step2','ar-step3','ar-results'].forEach(function(id){
          var el = document.getElementById(id);
          if (el) el.style.display = 'none';
        });
        var targetId = (n === 'results') ? 'ar-results' : 'ar-step' + n;
        var el = document.getElementById(targetId);
        if (el) el.style.display = 'block';
        for (var i = 1; i <= 3; i++) {
          var dot = document.getElementById('ar-dot-' + i);
          if (dot) dot.style.background = (typeof n === 'number' && i <= n) ? '#E85D04' : '#333';
        }
        var labels = {1:'Step 1 of 3', 2:'Step 2 of 3', 3:'Step 3 of 3'};
        var lbl = document.getElementById('ar-step-label');
        var prog = document.getElementById('ar-progress');
        if (n === 'results') {
          if (prog) prog.style.display = 'none';
          if (lbl) lbl.style.display = 'none';
        } else {
          if (prog) prog.style.display = 'flex';
          if (lbl) { lbl.style.display = 'block'; lbl.textContent = labels[n] || ''; }
        }
      }

      window.arGoStep2 = function() { if (arMood) arSetStep(2); };
      window.arGoStep1 = function() { arSetStep(1); };
      window.arGoStep3 = function() { if (arLen) arSetStep(3); };
      window.arGoStep2Back = function() { arSetStep(2); };

      window.arGetResults = function() {
        var watched = Array.from(document.querySelectorAll('input[name="ar-watched"]:checked')).map(function(cb){ return cb.value; });
        var pool = (arDB[arMood] && arDB[arMood][arLen]) ? arDB[arMood][arLen] : [];
        var filtered = pool.filter(function(a){ return watched.indexOf(a.title) === -1; });
        if (filtered.length === 0) filtered = pool.slice(0, 3);
        var picks = filtered.slice(0, 3);
        var container = document.getElementById('ar-cards');
        container.innerHTML = picks.map(function(a) {
          return '<div style="background:#111;border:2px solid #222;border-radius:14px;padding:28px 24px;display:flex;flex-direction:column;gap:14px;">'
            + '<h4 style="font-family:'Bangers',cursive;font-size:1.8rem;color:#fff;margin:0;line-height:1.2;">' + a.title + '</h4>'
            + '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">'
            + '<span style="background:#E85D04;color:#fff;padding:4px 14px;border-radius:20px;font-size:0.78rem;font-family:'Inter',sans-serif;">' + a.genre + '</span>'
            + '<span style="color:#aaa;font-size:0.85rem;font-family:'Inter',sans-serif;">' + a.rating + '</span>'
            + '</div>'
            + '<p style="color:#bbb;font-family:'Inter',sans-serif;font-size:0.9rem;line-height:1.6;margin:0;">' + a.desc + '</p>'
            + '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:auto;">'
            + '<a href="' + a.watch + '" target="_blank" style="flex:1;min-width:120px;text-align:center;background:#1a1a1a;color:#fff;border:2px solid #333;padding:10px 16px;border-radius:8px;text-decoration:none;font-family:'Inter',sans-serif;font-size:0.85rem;font-weight:600;">&#9654; Watch Now</a>'
            + '<a href="' + a.merch + '" target="_blank" style="flex:1;min-width:120px;text-align:center;background:#E85D04;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;font-family:'Bangers',cursive;font-size:1rem;letter-spacing:1px;">Shop Merch &rarr;</a>'
            + '</div>'
            + '</div>';
        }).join('');
        arSetStep('results');
        var resultsEl = document.getElementById('ar-results');
        if (resultsEl) {
          resultsEl.style.display = 'block';
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      window.arRestart = function() {
        arMood = null; arLen = null;
        document.querySelectorAll('.ar-mood-btn').forEach(function(b){ b.classList.remove('selected'); });
        document.querySelectorAll('.ar-len-btn').forEach(function(b){ b.classList.remove('selected'); });
        document.querySelectorAll('input[name="ar-watched"]').forEach(function(cb){ cb.checked = false; });
        var n1 = document.getElementById('ar-next1');
        if (n1) { n1.style.opacity = '0.4'; n1.style.pointerEvents = 'none'; }
        var n2 = document.getElementById('ar-next2');
        if (n2) { n2.style.opacity = '0.4'; n2.style.pointerEvents = 'none'; }
        arSetStep(1);
      };
    })();
    