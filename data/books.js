// source: https://www.barnesandnoble.com/blog/25-books-probably-read-already/

const books = [
  {
    id: 101,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780446310789.jpg",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "Harper Lee’s classic is one those rare perfect novels, which by itself makes it a should read. It’s further elevated by the evergreen nature of its central conflicts and plot; nearly six decades after publication, the story of a small southern town’s struggle with racism and injustice remains disturbingly current. It’s also become a must read because it’s widely the quintessential 20th-century American novel.",
  },
  {
    id: 102,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780143104919.jpg",
    title: "Ceremony",
    author: "Leslie Marmon Silko",
    description:
      "One of the most powerful novels of the modern era twists World War II, the traditions of the Navajo and Pueblo people, and mental health into a story that introduces a culture and point of view missing from most American and Western experiences. Its presentation of a spiritual aspect to life that isn’t traditionally monotheistic, and its beautiful, hallucinatory writing make it essential.",
  },
  {
    id: 103,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780385474542.jpg",
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    description:
      "One of the first African novels to be widely studied and read in the English-speaking world, Achebe’s book remains a must-read for the uniqueness of its literary vision and characters. Focused on a fictional village in Nigeria, the book’s epic scope traces how life changes from pre-colonial times to post-colonial modernity (for the time; the novel was published in 1958).",
  },
  {
    id: 104,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9781593080181.jpg",
    title: "Moby Dick",
    author: "Herman Melville",
    description:
      "Perhaps the most notorious “eat your vegetables” novel of all time, Moby-Dick looms on many people’s literary bucket lists like a shadow—too long, too flowery, and much too concerned with 19th century whaling tactics. But it must read for the simple reason that understanding much of the literature that followed  novel requires it, so profound was its influence. The fact that it’s also a really great story once you get past all the sailing jargon also helps.",
  },
  {
    id: 105,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780156028356.jpg",
    title: "The Color Purple",
    author: "Alice Walker",
    description:
      "Brutal, harsh, yet somehow raggedly beautiful, Walker’s Pulitzer Prize-winning novel is a must read because its subject matter, focused on the grim lives of African-American women in 1930s rural Georgia, shouldn’t be turned away from. Exploring the long ragged scars of racism, slavery, and class inequality, it’s one of those novels people are always trying to get banned—and you know what? Any novel certain people don’t want you to read is a novel you must read.",
  },
  {
    id: 106,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9781451626650.jpg",
    title: "Catch-22",
    author: "Joseph Heller",
    description:
      "Few novels in any language capture the pure insanity of living within a massive bureaucracy quite as well as this one. Kafka captured much of the nightmarish dream logic of such institutions (and life itself), but Heller’s brilliance is how he uses a slippery sense of time and a numbing repetition of the absurd to really make you understand how little you understand about your own existence.",
  },
  {
    id: 107,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780452286368.jpg",
    title: "Atlas Shrugged",
    author: "Ayn Rand",
    description:
      "Sometimes you must read books in order to use the good ideas within to guide you in life. Sometimes you must read books to be able to identify bad ideas and avoid them. Atlas Shrugged somehow demands to be read for both reasons, depending on the reader, which makes it that much more essential. It’s a glorious mess of a philosophy encapsulated in a glorious mess of a sci-fi novel.",
  },
  {
    id: 108,
    type: "non-fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9781451651683.jpg",
    title: "The Rise and Fall of the Third Reich",
    author: "William L. Shirer",
    description:
      "Shirer is a laborious writer who never fails to use a 25-cent word when a 5-cent word will do, and his exhaustive look at how the Nazis came to power is a bit dated, but it remains one of the few books that captures the shambolic rise of Hitler and the Nazis. Despite being under-educated, intellectually confused, and unpopular, they somehow took over an entire country and swept it into a fever-dream of death and destruction that almost destroyed the world. Understanding how it happened is about as essential as it gets.",
  },
  {
    id: 109,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780547928180.jpg",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description:
      "If you’re going to read a fantasy, read the ur-fantasy, the godfather of the entire genre in its modern incarnation. If you love fantasy but haven’t read LOTR, you might be missing out—everything you love about the genre has its roots here (even if only to reject everything Tolkien laid down), and few fantasy epics have as deep a backstory.",
  },
  {
    id: 110,
    type: "drama",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780393929584.jpg",
    title: "Hamlet",
    author: "William Shakespeare",
    description:
      "It’s easy to bounce off of Shakespeare; his plays are set in an unrecognizable world, written in an unrecognizable version of English, and forced upon us in school. And yet, you must read Hamlet. Not only is it the Bard’s best play, it also contains some of his most famous passages and has influenced a wide swatch of literature.",
  },
  {
    id: 111,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9781840226355.jpg",
    title: "The Murder of Roger Akroyd",
    author: "Agatha Christie",
    description:
      "Christie invented a whole mess of what we think of as modern thriller tropes, and you can draw a direct line between Ackroyd and books like Gone Girl and The Woman in the Window. The term “unreliable narrator” might as well have a small portrait of Roger Ackroyd next to it in the dictionary, and the only way you’ll ever appreciate the term is to read this book. Probably twice.",
  },
  {
    id: 112,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780446310789.jpg",
    title: "Ulysses",
    author: "James Joyce",
    description:
      "Another one of those incredibly long books that’s simply challenging to read. Many people avoid this one, especially once they find out its plot is basically  about a bunch of people wandering around Dublin in 1904 and thinking things. But if you want to really understand modernism (and postmodernism, come to think of it), you must read Ulysses. Any time a book plays with point-of-view, literary allusions, and stream-of-consciousness, there’s a line going back directly to this incredibly novel.",
  },
  {
    id: 113,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780679732761.jpg",
    title: "Invisible Man",
    author: "Ralph Ellison",
    description:
      "Ellison combines a fluid, compelling writing style with a robust exploration of life as a black man in mid-century America. The unnamed narrator tells his story from his youth in a small Southern town, where he wins a scholarship to college that he can secure only after taking part in a brutal fight for the amusement of rich white sponsors, to his engagement with rising black nationalism and his realization that his color renders him, for all practical purposes, invisible to society at large.",
  },
  {
    id: 114,
    type: "graphic-novel",
    imgUrl: "http://prodimage.images-bn.com/pimages/9781401245252.jpg",
    title: "Watchmen",
    author: "Alan Moore",
    description:
      "Watchmen a graphic novel that demonstrates the true potential of the format. If you comic books are just for kids, this is the book that will change your mind. Even better, if you have a vast collection of comics and graphic novels, it can be appreciated as a story that simultaneously celebrates and deconstructs superhero tropes.",
  },
  {
    id: 115,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780671880316.jpg",
    title: "Schindler’s List",
    author: "Thomas Keneally",
    description:
      "You must read this book because it’s essential to understand the Holocaust not just as a frozen exhibit in history, but as a study of the lowest depths a supposedly modern civilization can sink—and how quickly and easily it can happen. Keneally brings it home by focusing on the efforts of Oskar Schindler, whose slow moral awakening to the grim reality around is something that anyone can identify with—and then ask themselves, what would they do in a similar scenario?",
  },
  {
    id: 116,
    type: "non-fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780553103748.jpg",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    description:
      "Despite the breathless proclamations from self-described social-media mavens telling you that video is how the youths absorb information, reading remains the best way to learn anything. Hawking’s classic book comes from one of the best minds of any generation, boiling down the most awe-inspiring concepts of modern physics into an understandable form that will help you dip at least a toe into an ocean of knowledge. Dare we say it, it’s a must-read for everyone living in the universe.",
  },
  {
    id: 117,
    type: "drama",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780802130914.jpg",
    title: "Glengarry Glen Ross",
    author: "David Mamet",
    description:
      "Few other writers have so ably conveyed the crushing desperation of the modern working class—specifically, the crushing pressures facing salespeople, whose job is to somehow dominate the wills of others in order to gain a small commission. The inhumanity of our society and economic system is disguised by toxic masculinity, sheer dumb luck, and the mental gymnastics required to turn a terrible job and fraught existence into something we can pretend is worthwhile.",
  },
  {
    id: 118,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780679724773.jpg",
    title: "I, Claudius",
    author: "Robert Graves",
    description:
      "Graves’ brilliant novel is a sort of alternate history, getting into the mind of the ancient world’s most unlikely emperor, the stuttering, crippled Claudius, who survived the purge of the imperial family because everyone thought him too stupid to worry about. Proving to be a capable if too-trusting ruler, Claudius manages to give the reader hope (despite what we know to have happened) that the Roman Empire might somehow make it. Combining informative history with tense palace intrigue, Graves’ novel is unlike any history you’veever read.",
  },
  {
    id: 119,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780679732242.jpg",
    title: "The Sound and the Fury",
    author: "William Faulkner",
    description:
      "Faulkner made the bold decision to make the first section of this novel one of the most difficult pieces of writing you will ever encounter—it’s told from the point of view of a mentally-challenged man. The rest of the book’s sprawling story of the downfall of a Southern family isn’t so easy, either, but it’s also brilliantly lyrical, and infused with a sadness as powerful today as when it was first published.",
  },
  {
    id: 120,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9781593080457.jpg",
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    description:
      "You have to read at least one epic Russian novel in your life; it’s in the bibliophile bylaws. And if you’re going to read one epic Russian novel, make it The Brothers Karamazov,. Dostoevsky’s ability to make you feel like you know these 19th century folks intimately is a testament to his uncanny knowledge of human psychology. The story somehow examines economics, family ties, spirituality and atheism, and a dozen other major themes without once feeling like it’s doing any heavy lifting at all.",
  },
  {
    id: 121,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780679722649.jpg",
    title: "The Maltese Falcon",
    author: "Dashiell Hammett",
    description:
      "The modern concept of the private investigator, the rough-and-tumble guy with a gun and some questions, was born with Dashiell Hammett, and this is his best novel. It still crackles with a thoroughly modern energy, and upon publication signaled a sea-change in the stories that novels could tell, and the manner in which they could be told. That’s as important as any postmodern artistic experiment ever conducted.",
  },
  {
    id: 122,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780345806567.jpg",
    title: "Giovanni’s Room",
    author: "James Baldwin",
    description:
      "The list of mainstream fiction that deals with homosexuality in a sincere and powerful way remains woefully short, but at the top of it is this remarkable novel by Baldwin, one of the most complex examinations of a gay character (now more accurately considered a bisexual character) of its era. The story of an American’s affair with a Parisian man who is eventually executed for murder is a fantastic story and a crucial example of representation.",
  },
  {
    id: 123,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780062498533.jpg",
    title: "The Hate U Give",
    author: "Angie Thomas",
    description:
      "Whatever your age, social status, ethnicity, or political thought, you must read this searingly honest and passionate debut novel. It’s quickly a must-read, coming as close as anything to truly capturing the current state of the country. It tells the story of a young girl pulled into activism and the Black Lives Matter movement after witnessing a police shooting of an unarmed friend. It’s incredible success is a testament to its currency; if you want to know what’s going on outside of cable news and narrow-beam blogs, you must read this book.",
  },
  {
    id: 124,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780449213940.jpg",
    title: "All Quiet on the Western Front",
    author: "Erich Maria Remarque",
    description:
      "Closing in on a century after its publication, this story of German soldiers fighting in World War I remains one of the best examinations of the effects that modern warfare has on the human psyche. Despairing and bleak, it’s a must-read primarily for the power of its story, but also, increasingly, for offering a glimpse of a time and place that risks becoming lost to the sands of time.",
  },
  {
    id: 125,
    type: "fiction",
    imgUrl: "http://prodimage.images-bn.com/pimages/9780803245778.jpg",
    title: "Tell Me a Riddle",
    author: "Tillie Olsen",
    description:
      "Largely overlooked today, Olsen’s greatest work finds beauty and poetry in the plight of the American middle-class housewife. Even in the modern day, the slow suffocation of those who follow the expected path of their lives, to the detriment of their dreams, resonates. There is immense power in these stories, and the book is a must-read for anyone needing a reminder that true beauty can be found anywhere, by someone with clear-eyed ability to see it.",
  },
];

module.exports = { books };
