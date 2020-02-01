const mergeImages = require("merge-images");
const fs = require('fs');
const { Canvas, Image } = require("canvas");
Canvas.Image = Image;

const emojiMergeImages = result => {
  return mergeImages(['./body.png', './eyes.png', './mouth.png'], {
    Canvas: Canvas
  })
  .then(base64Str => {
    const img = base64Str.split(';base64,').pop();
    fs.writeFile('emoji.png', img, {encoding: 'base64'}, function(err) {
    console.log('File created');
  })}) // DONE
}



const max9MergeImages = result => {
  return mergeImages([{ src: result[0].media_url, x: 0, y: 0 }], {
    Canvas: Canvas
  });
};

const result = [
  {
    id: "17859237253095920",
    timestamp: "2017-02-10T10:42:22+0000",
    media_type: "IMAGE",
    media_url:
      "https://scontent.xx.fbcdn.net/v/t51.2885-15/16584949_610641649130411_376434848199344128_n.jpg?_nc_cat=110&_nc_ohc=TDdW_13Cg6YAX-A6nr5&_nc_ht=scontent.xx&oh=6eb84fbcc646fe3a0e1fbe251ac27c10&oe=5ECA2FAA",
    permalink: "https://www.instagram.com/p/BQU_-UaDQGg/",
    caption: "Last night in SF with @boriss_e :)",
    likes: "98"
  },
  {
    id: "17842166386280908",
    timestamp: "2018-07-14T16:31:10+0000",
    media_type: "IMAGE",
    media_url:
      "https://scontent.xx.fbcdn.net/v/t51.2885-15/36537830_216101599111086_2311931632161914880_n.jpg?_nc_cat=100&_nc_ohc=YLZsu2ovBMcAX_F1jfs&_nc_ht=scontent.xx&oh=cdb2fadddee8892388d82ff4421c71d4&oe=5E9632A7",
    permalink: "https://www.instagram.com/p/BlOAdBwBR1U/",
    caption:
      "Awesome 3 days at @jaguarsuk academy learning from Coach Bryant (Played College Football at Alabama, Jaguars 1st round pick and superbowl champion with the Steelers). PS - I’m on the left",
    likes: "94"
  },
  {
    id: "17923882390034769",
    timestamp: "2018-02-07T18:51:33+0000",
    media_type: "IMAGE",
    media_url:
      "https://scontent.xx.fbcdn.net/v/t51.2885-15/27575756_940378102782363_5139138084327129088_n.jpg?_nc_cat=103&_nc_ohc=oVrJR-3dBoAAX-PRs7O&_nc_ht=scontent.xx&oh=0d973e26a399c4366bc08ea2530862f3&oe=5EC6A5E0",
    permalink: "https://www.instagram.com/p/Be5_t9xlHQn/",
    caption:
      "Workout + Smoothie + AirPods. Adapting well to San Francisco 🇺🇸 #clichés",
    likes: "78"
  },
  {
    id: "17841560044009849",
    timestamp: "2015-05-17T08:31:14+0000",
    media_type: "IMAGE",
    media_url:
      "https://scontent.xx.fbcdn.net/v/t51.2885-15/11311117_1053595274670387_931497412_n.jpg?_nc_cat=107&_nc_ohc=AeMwuC_4HeYAX-GiyGa&_nc_ht=scontent.xx&oh=3efd585e0669a06a1f9d0b4d12920459&oe=5EBF86D5",
    permalink: "https://www.instagram.com/p/2xsMK9DUcv/",
    caption: "The Mud Day. From last weekend.",
    likes: "74"
  },
  {
    id: "17898149050040865",
    timestamp: "2017-09-07T08:10:41+0000",
    media_type: "IMAGE",
    media_url:
      "https://scontent.xx.fbcdn.net/v/t51.2885-15/21373004_351478878619558_5247493396171325440_n.jpg?_nc_cat=108&_nc_ohc=IQf9NVy7gEcAX9k4oj7&_nc_ht=scontent.xx&oh=da018876c62e2df01186bf1c5ad81db8&oe=5EC38256",
    permalink: "https://www.instagram.com/p/BYu4wJflz5A/",
    caption: "Circa 2015 🏈 #tbt",
    likes: "69"
  },
  {
    id: "17891418094101409",
    timestamp: "2017-10-20T14:12:36+0000",
    media_type: "IMAGE",
    media_url:
      "https://scontent.xx.fbcdn.net/v/t51.2885-15/22581763_282793515572447_8433623096962842624_n.jpg?_nc_cat=106&_nc_ohc=0Mlr0PSlsisAX8M9-er&_nc_ht=scontent.xx&oh=d76d89f75ec0541b8f5ce5a95fcef9cf&oe=5E973628",
    permalink: "https://www.instagram.com/p/BaeQWi7FZRe/",
    caption: "Sunset in the desert 🌅",
    likes: "67"
  },
  {
    id: "17890161220185860",
    timestamp: "2017-12-26T15:52:08+0000",
    media_type: "IMAGE",
    media_url:
      "https://scontent.xx.fbcdn.net/v/t51.2885-15/26157715_1493292174120134_5374822318751088640_n.jpg?_nc_cat=104&_nc_ohc=h5NZ6oM2aFMAX8ac9bO&_nc_ht=scontent.xx&oh=7cafd7cf8500f23ecccd2e6bb6d0d25b&oe=5ECA9A11",
    permalink: "https://www.instagram.com/p/BdK9APwloDC/",
    caption: "💁‍♂️💁‍♀️",
    likes: "67"
  },
  {
    id: "17879702047103566",
    timestamp: "2017-07-27T09:29:19+0000",
    media_type: "IMAGE",
    media_url:
      "https://scontent.xx.fbcdn.net/v/t51.2885-15/17932679_1895688430681429_2057103409944723456_n.jpg?_nc_cat=107&_nc_ohc=Mbrylj7jjWMAX_9tSjx&_nc_ht=scontent.xx&oh=5789859d8969c672b5307183993f2719&oe=5EC5667C",
    permalink: "https://www.instagram.com/p/BXC4XTfF3GE/",
    caption: "Iceland throwback 🇮🇸 #tbt",
    likes: "65"
  },
  {
    id: "17882864245478084",
    timestamp: "2020-01-01T18:15:35+0000",
    media_type: "IMAGE",
    media_url:
      "https://scontent.xx.fbcdn.net/v/t51.2885-15/79165348_2507968056107365_7777175546336834471_n.jpg?_nc_cat=104&_nc_ohc=DLnwbFJsHTIAX9zZHdO&_nc_ht=scontent.xx&oh=8e84d293403885582d4252276385636c&oe=5ED19FA6",
    permalink: "https://www.instagram.com/p/B6yWe5rCpkP/",
    caption: "Fin de la décennie ! Merci ❤️",
    likes: "63"
  }
];

max9MergeImages(result);
emojiMergeImages()