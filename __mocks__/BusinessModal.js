
const fakeBuinessData = {
    id: "W1bb3agzrK1VwXDpC-9MyQ",
    name: "The Printworks",
    phone: "+441618298000",
    photos: [
        "https://s3-media3.fl.yelpcdn.com/bphoto/hqW9Yz2swOuFETkzGt3k_w/o.jpg",
        "https://s3-media2.fl.yelpcdn.com/bphoto/ULOswWrUOyPntxttjcTfTw/o.jpg",
        "https://s3-media1.fl.yelpcdn.com/bphoto/gqxz7mDHX-uYF-RkdvanXw/o.jpg"
    ],
    isOpen: true,
    url: "https://www.yelp.com/biz/the-printworks-manchester?adjust_creative=3yP4hKOPjtJfpae0SpjWDQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=3yP4hKOPjtJfpae0SpjWDQ",
    reviewCount: 53,
    foodRating: null,
    hours: ["06:00 - 03:00", "06:00 - 03:00", "06:00 - 03:00", "06:00 - 03:00", "06:00 - 04:00", "07:00 - 04:00", "07:00 - 02:00"],
    address: "27 Withy Grove",
    postcode: "M4 2BS"
}

export default fetch = () => {
    return new Promise((resolve) => {
        resolve(fakeBuinessData)
    })
}
