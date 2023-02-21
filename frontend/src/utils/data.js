export const categories = [
  {
    name: 'Formal',
    image: 'https://i.pinimg.com/750x/eb/47/44/eb4744eaa3b3ccd89749fa3470e2b0de.jpg',
  },
  {
    name: 'Festive',
    image: 'https://i.pinimg.com/236x/25/14/29/251429345940a47490cc3d47dfe0a8eb.jpg',
  },
  {
    name: 'Spirit Week',
    image: 'https://i.pinimg.com/236x/03/48/b6/0348b65919fcbe1e4f559dc4feb0ee13.jpg',
  },
  {
    name: 'Sports',
    image: 'https://i.pinimg.com/750x/66/b1/29/66b1296d36598122e6a4c5452b5a7149.jpg',
  },
  {
    name: 'Field Trips',
    image: 'https://i.pinimg.com/236x/72/8c/b4/728cb43f48ca762a75da645c121e5c57.jpg',
  },
  {
    name: 'Fundraisers',
    image: 'https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg',
  },
  {
    name: 'Donations',
    image: 'https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg',
  },
];

export const ranking = [
  {
    name: 'Person 1',
    image: 'https://image.shutterstock.com/mosaic_250/287881/1768126784/stock-photo-young-handsome-man-with-beard-wearing-casual-sweater-and-glasses-over-blue-background-happy-face-1768126784.jpg',
    rank: 1,
  },
  {
    name: 'Person 2',
    image: 'https://media.istockphoto.com/id/957333242/photo/portrait-of-thoughtful-handsome-man-with-black-glasses-in-casual-style-thinking.jpg?s=612x612&w=0&k=20&c=EsTcqu9_pbvW59-DLhYZrhtTzxRy_6jqGfPERmesOx8=',
    rank: 2,
  },
  {
    name: 'Person 3',
    image: 'https://thumbs.dreamstime.com/b/young-arab-man-beard-wearing-glasses-arms-crossed-gesture-looking-camera-blowing-kiss-being-lovely-sexy-238659869.jpg',
    rank: 3,
  },
  {
    name: 'Person 4',
    image: 'https://thumbs.dreamstime.com/b/young-hispanic-man-wearing-casual-clothes-glasses-winking-looking-camera-sexy-expression-cheerful-happy-face-220599687.jpg',
    rank: 4,
  },
  {
    name: 'Person 5',
    image: 'https://thumbs.dreamstime.com/b/hispanic-man-beard-wearing-business-shirt-glasses-smiling-cheerful-presenting-pointing-palm-hand-looking-camera-235195045.jpg',
    rank: 5,
  },
  {
    name: 'Person 6',
    image: 'https://thumbs.dreamstime.com/b/young-hispanic-man-wearing-casual-clothes-smiling-laughing-hard-out-loud-funny-crazy-joke-hands-body-young-212532409.jpg',
    rank: 6,
  },
  {
    name: 'Person 7',
    image: 'https://thumbs.dreamstime.com/b/man-pointing-to-themselves-handsome-smiling-isolated-over-gray-background-71661028.jpg',
    rank: 7,
  },
  {
    name: 'Person 8',
    image: 'https://thumbs.dreamstime.com/b/guy-approves-your-perfect-choice-cheerful-good-looking-man-t-shirt-showing-okay-gesture-like-something-smiling-as-agree-accept-164239230.jpg',
    rank: 8,
  }, {
    name: 'Person 9',
    image: 'https://thumbs.dreamstime.com/b/young-black-man-doing-victory-sign-peace-gesture-winking-looking-camera-sexy-expression-cheerful-happy-face-220079113.jpg',
    rank: 9,
  }, {
    name: 'Person 10',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-hn0Y_MwW1MnLKa5FL8n7PVDDJMZMOpUAuFtiSn9_OR3INzUzUl1BPP_yARSibDox9M&usqp=CAU',
    rank: 10,
  },
];

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      }
    }`
  return query
}

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`
  return query
}

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image {
            asset -> {
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[]{
            _key,
            postedBy->{
                _id,
                userName,
                image
            },
        },
    }`
  return query
}
export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
    image {
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
        _id,
        userName,
        image
    },
    save[]{
        _key,
        postedBy->{
            _id,
            userName,
            image
        },
    },
} `

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
  return query;
};