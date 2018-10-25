import { connect } from 'react-redux';
import NewsIndex from './news_index';

const msp = state => {
    return {
          articles: [{
                source: { id: 'engadget', name: 'Engadget' },
                     author: 'Rachel England',
                     title: '\'Fortnite\' celebrates Halloween with themed outfits and challenges',
                     description: 'Fortnite is a gaming juggernaut that just won\'t quit. No doubt part of its success are the constant changes and updates that keep things fresh, and with Halloween just around the corner, what better time than now to unveil a new in-game event and patch? \'Fort...',
                     url: 'https://www.engadget.com/2018/10/24/fortnite-celebrates-halloween-with-themed-outfits-and-challeng/',
                     urlToImage: 'https://o.aolcdn.com/images/dims?thumbnail=1200%2C630&quality=80&image_uri=https%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fcrop%3D1920%252C1080%252C0%252C0%26quality%3D85%26format%3Djpg%26resize%3D1600%252C900%26image_uri%3Dhttps%253A%252F%252Fmedia-mbst-pub-ue1.s3.amazonaws.com%252Fcreatr-uploaded-images%252F2018-10%252Fad6ece00-d76c-11e8-bffb-d87a74c247d9%26client%3Da1acac3e1b3290917d92%26signature%3D868e513eb86ee01e1f97574030648e99eb7e08d8&client=amp-blogside-v2&signature=6ba05a10d0d61ed3b563a6bd756ff413c4c72cb3',
                     publishedAt: '2018-10-24T11:01:00Z',
                     content: '\'Fortnitemares\' -- the game\'s first official Halloween-themed event -- kicks off today and runs until November 26, with a bunch of themed cosmetic items, spooky challenges, Limited Time Modes and creepy map changes. Developer Epic has even hinted that the muc... [+1222 chars]' },
             {
                source: { id: 'mashable', name: 'Mashable' },
                     author: 'Xavier Piedra',
                     title: '28 Halloween group costume ideas that are perfect for any squad',
                     description: 'In the week before Halloween, last-minute shoppers crowd costume stores looking for the perfect spooky getup. Being guilty of this hectic process several times in my life, I\'m happy to say that I will continue the tradition yet again this year. In the defense...',
                     url: 'https://mashable.com/article/best-group-halloween-costume-ideas-2018/',
                     urlToImage: 'https://i.amz.mshcdn.com/7gBV4BRyYpFVQ1C7AyJ-WSHlp8M=/1200x630/2018%2F10%2F23%2F39%2Fd25171c63a0b4447a64535b73a1c0242.6d7bc.jpg',
                     publishedAt: '2018-10-23T16:00:00Z',
                     content: 'In the week before Halloween, last-minute shoppers crowd costume stores looking for the perfect spooky getup. Being guilty of this hectic process several times in my life, I\'m happy to say that I will continue the tradition yet again this year. In the defense... [+1536 chars]' },
             {
                source: { id: 'mashable', name: 'Mashable' },
                     author: 'Shannon Connellan',
                     title: 'Jamie Lee Curtis on \'Halloween\': \'They wanted to take off the mask of trauma\'',
                     description: 'Courageous, traumatized women band together to fight a relentless male predator against all odds Sound familiar? Although written well before the #MeToo movement made its mark, the new Halloween film has landed at one hell of a relevant moment, as not only th...',
                     url: 'https://mashable.com/article/halloween-jamie-lee-curtis-interview/',
                     urlToImage: 'https://i.amz.mshcdn.com/6ISiDf3Uxsmqo_n8sHH6fxZh4Wc=/1200x630/2018%2F10%2F24%2F3f%2F512abdb2694f475785e662a669c2d02a.02390.jpg',
                     publishedAt: '2018-10-24T14:00:48Z',
                     content: 'Courageous, traumatized women band together to fight a relentless male predator against all odds. Sound familiar? Although written well before the #MeToo movement made its mark, the new Halloween film has landed at one hell of a relevant moment, as not only t... [+4504 chars]' },
             {
                source: { id: null, name: 'Lifehacker.com' },
                     author: 'Aimée Lutkin',
                     title: 'How to Put Together a Good Disguise, According to the CIA',
                     description: 'Everyone is thinking about costumes with Halloween right around the corner, but for some people, dressing up as someone else is a very serious business. For spies, it’s a matter of life and death, and they need to get it exactly right. Read more...',
                     url: 'https://lifehacker.com/how-to-put-together-a-good-disguise-according-to-the-c-1829940877',
                     urlToImage: 'https://i.kinja-img.com/gawker-media/image/upload/s--tYi4Cc84--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/bb64mtjylhmqleoleejt.jpg',
                     publishedAt: '2018-10-23T19:30:00Z',
                     content: 'Everyone is thinking about costumes with Halloween right around the corner, but for some people, dressing up as someone else is a very serious business. For spies, its a matter of life and death, and they need to get it exactly right. Jonna Mendez is the CIAs... [+3782 chars]' },
             {
                source: { id: 'mashable', name: 'Mashable' },
                     author: 'Sam Haysom',
                     title: 'This Banksy-themed costume just hands down won Halloween',
                     description: 'Nowadays, the top prize for a Halloween costume competition doesn\'t necessarily go to the scariest creation. It often goes to the most inventive. Or, in this case, the most inventively topical. SEE ALSO: Actually, Banksy meant to shred the whole painting "My ...',
                     url: 'https://mashable.com/article/banksy-artwork-halloween-costume/',
                     urlToImage: 'https://i.amz.mshcdn.com/L4Y7LG8pzV6G3OZwCV1-_UqapL0=/1200x630/2018%2F10%2F23%2Fd1%2Fbbb6d9d89c024270a1451299cff40d5c.b61c4.jpg',
                     publishedAt: '2018-10-23T10:00:46Z',
                     content: 'Nowadays, the top prize for a Halloween costume competition doesn\'t necessarily go to the scariest creation. It often goes to the most inventive. Or, in this case, the most inventively topical. SEE ALSO: Actually, Banksy meant to shred the whole painting "My ... [+250 chars]' },
             {
                source: { id: null, name: 'Cnet.com' },
                     author: 'Gordon Gottsegen',
                     title: 'Fortnite\'s Fortnitemares unleashes spooky skins, exclusives in time for Halloween - CNET',
                     description: 'The battle royale game just announced its Halloween-themed event.',
                     url: 'https://www.cnet.com/news/fortnites-fortnitemares-unleashes-spooky-skins-exclusives-in-time-for-halloween/',
                     urlToImage: 'https://cnet4.cbsistatic.com/img/0VZLxBsNmBzRFzCC4Q-w1IaOtZQ=/724x407/2018/10/24/fdee6256-c782-4720-acc7-db5bd90b5794/fortnitemares-event.jpg',
                     publishedAt: '2018-10-24T15:36:19Z',
                     content: 'Halloween is just around the corner and Fortnite is getting spooky to celebrate. Epic Games on Wednesday announced the Fortnitemares 2018 event, beginning Oct. 24. During the event, the Battle Royale mode will be taken over by zombie-like Cube Monsters, which... [+491 chars]' },
             {
                source: { id: null, name: 'Cnet.com' },
                     author: 'Rick Broida',
                     title: 'Don\'t miss these sweet Halloween deals - CNET',
                     description: 'A few last-minute bargains on costumes, candy and more!',
                     url: 'https://www.cnet.com/news/dont-miss-these-sweet-halloween-deals-2018/',
                     urlToImage: 'https://cnet2.cbsistatic.com/img/xzPfpoAOap7KWB6rqLV71o2TUfs=/2018/10/17/dfc6b8e7-4e2b-4516-8c1f-aab34b4896da/screen-shot-2018-10-17-at-10-50-37-am.png',
                     publishedAt: '2018-10-24T15:37:34Z',
                     content: 'Mars My favorite holiday? Halloween, no question. Spooky fun? Check. Adorable kids in costumes? Check. Candy as far as the eye can see? Check (made out to the dentist). We\'re just shy of two weeks out, so this seems like the perfect time to round up some grea... [+3581 chars]' },
            {
                source: { id: 'business-insider', name: 'Business Insider' },
                     author: 'Travis Clark',
                     title: 'How much every \'Halloween\' movie made opening weekend at the box office, including 2018\'s record-smashing entry',
                     description: 'Michael Myers is back with a vengeance. The latest "Halloween" made $76 million in its opening weekend at the box office, a franchise best and the second-best opening for a horror movie of all time. That\'s more than most of the other "Halloween" movies made d...',
                     url: 'https://www.businessinsider.com/halloween-movies-ranked-by-box-office-opening-weekend-2018-10',
                     urlToImage: 'https://amp.businessinsider.com/images/5bcf2fecead52d6ec82af867-1136-568.jpg',
                     publishedAt: '2018-10-23T18:20:34Z',
                content: 'Michael Myers is back with a vengeance. The latest "Halloween" made $76 million in its opening weekend at the box office, a franchise best and the second-best opening for a horror movie of all time. That\'s more than most of the other "Halloween" movies made d... [+1316 chars]'
          },
             {
                source: { id: null, name: 'Thisisinsider.com' },
                     author: 'Shelby Slauer',
                     title: 'These are the very best cities to celebrate Halloween in this year',
                     description: 'Where you spend Halloween can be just as important how you spend the holiday. To find the best places to spend Halloween, INSIDER consulted WalletHub\'s 2018 list of best cities for Halloween. The personal finance website collected data on 100 of the most popu...',
                     url: 'https://www.thisisinsider.com/best-cities-for-halloween-wallethub-2018-10',
                     urlToImage: 'https://amp.businessinsider.com/images/5bcf89a5dde86721265e8708-2732-1366.jpg',
                     publishedAt: '2018-10-23T20:48:22Z',
                     content: 'New York City\'s got everything, and that\'s why it\'s the best place to celebrate Halloween. It has the most candy stores, chocolate stores, and costume stores, and placed second in the "trick-or-treater friendliness" category because there isn\'t too much walki... [+232 chars]' },
            {
                source: { id: null, name: 'Boingboing.net' },
                     author: 'Cory Doctorow',
                     title: 'Halloween ornaments painted on salvaged lightbulbs',
                     description: 'David Irvine (AKA gnarledbranch ) sent us a selection of photos of his delightful Halloween ornaments painted on salvaged lightbulbs. Read the rest',
                     url: 'https://boingboing.net/2018/10/23/spookybulbs.html',
                     urlToImage: 'https://media.boingboing.net/wp-content/uploads/2018/10/ets.jpg',
                     publishedAt: '2018-10-23T21:14:25Z',
                     content: 'Fold N Fly is a visual database of paper airplane designs, sortable by aerodynamic properties (distance, airtime, etc), and difficulty of folding. Some pretty exotic designs, too! (Thanks, Fipi Lele!) Today marks the publication of the $100 Dungeons and Drago... [+1486 chars]' }]
    }
}

export default connect(msp, null)(NewsIndex);