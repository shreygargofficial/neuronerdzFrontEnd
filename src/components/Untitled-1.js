import React from 'react'
import axios from 'axios'
export default class Blog extends React.Component {
    state = {
        data: ""
    }
    componentDidMount() {
        axios.get("http://localhost:5300/getBlogById/14").then(success => {
            this.setState({ data: (success.data.data) })
        }).catch(err => {
            if (err.response) {
                console.log(err.response.data.message)
            }
            else {
                console.log("Server Error")
            }
        })
    }
    render() {
        return (
            <div>
                {/* {JSON.stringify(this.state.data)} */}
                <h1>{this.state.data.blogTitle}</h1>


                <div dangerouslySetInnerHTML={{ __html: unescape(this.state.data.blogBody) }}>
                </div>

            </div>
        )
    }
}













//post






import React from 'react'
import { encode } from 'punycode';
import axios from 'axios'
export default class Blog extends React.Component{
    state={
        data:{
            "blogBody": escape('<span style="font-weight: 400;">The word "Aaruush" translates to "the first rays of the sun". And that\'s what it was, at the time of its inception back in 2007, the rays of the sun, which would eventually enlighten the lives of many people for years to come. Started by four visionary final year students of the college, Aaruush was initially intended to be a technical fest; consisting of 26 events and over 3000 participants, but it has exceeded the expectations of all. And so successful was the idea, that the inauguration was presided over by the former president of India, <a href="http://www.neuronerdz.com/12-former-chief-ministers-who-lost-in-2019-lok-sabha-elections/">Dr. A.P.J. Abdul Kalam</a>.</span><img class="aligncenter" src="https://scontent.flko1-1.fna.fbcdn.net/v/t1.0-9/20992882_881562728658387_394645741113658916_n.jpg?_nc_cat=111&amp;_nc_oc=AQk55PjbE14CV-o8YV6C4xGaK0vuN_SSrve5irYC7-2eKpxVV6cc1DV6Yz0CAahQe8L4vpAk1tzRJN4i2rBrg4NH&amp;_nc_ht=scontent.flko1-1.fna&amp;oh=410db208332164f47d66f23cb1b4ef16&amp;oe=5E02CBF4" width="720" height="267"/><h3 style="text-align: center;"><strong>The Theme: "Towards Infinity"</strong></h3><span style="font-weight: 400;">Getting across the message of the need for innovations and technical breakthroughs to create a benchmark in the industry and make an actual difference. We believe in overcoming obstacles and exceeding expectations with tireless hard work and dedication.</span><span style="font-weight: 400;">These are just a few of the words we use to describe things that are Infinite. Aaruush uses these ideas to create a platform showcasing a plethora of talent. We find infinity in the number of stars in the night sky, the number of raindrops in an ocean, the memories hidden behind the lens of an eye and the number of ideas that emerge out of minds alike.</span><span style="font-weight: 400;">Aaruush towards Infinity leads these minds towards the path of inspiration, discovery, growth, and achievement. It brings out the talents of more than 40,000 of its participants with utmost enthusiasm and gratification. With mind-boggling events and eye-catching highlights, Aaruush ’19 steps into its 13th year with the ambition of leaping across the stars and furthering the very definition of infinity.</span><h4 style="text-align: center;"><strong>The <a href="https://en.wikipedia.org/wiki/Motto" target="_blank" rel="noopener noreferrer">Motto</a>: "Rising in the spirit of innovation"</strong></h4><span style="font-weight: 400;">Striving to change the world with the power of innovation and cumulative efforts of bright ignited minds to bridge the gap between technological advancements and societal expectations is the bedrock of Aaruush. We believe in constantly rising and approaching problems with innovative solutions to make the world a sound place to live in.</span><img class="alignnone size-medium wp-image-6609" src="http://www.neuronerdz.com/wp-content/uploads/2019/09/69271531_1414681772013144_885522299661320192_o-300x203.jpg" alt="" width="300" height="203"/> <img class="alignnone size-medium wp-image-6610" src="http://www.neuronerdz.com/wp-content/uploads/2019/09/69327233_1414665478681440_8638244233821552640_o-300x207.jpg" alt="" width="300" height="207"/><span style="font-weight: 400;">Aaruush is back, and it\'s back with a bang! The previous year, bands like The Local Train, Attva, The Nonviolinist Project and single artists like Samarth Swarup were leading the line at the Musical Nites. With exemplary leaders inaugurating the 5-day fest, the students were super excited to witness Varun Thakur as the main takeaway from the first day. Before the fest, the students took part in numerous activities like T-Summit, Hack Summit, SRM Run and Colosseum. As the fest progressed, students took part in various domains, like Bluebook, Fundaz, X-Zone, Magefficie, etc. The 12th edition of Aaruush saw a footfall of 70,000, over 10 workshops, 10 luminary addresses, 60+ events, thrilling challenges and championships and a plethora of learning opportunities hand in hand with fun and intellectually stimulating activities. </span><blockquote><span style="font-weight: 400;">Our race towards infinity is fast-paced and reaching higher standards as we go. Aaruush ’19 is going to reach greater heights; we’ve seen the black-hole now so for team Aaruush the sky is also no limit.</span></blockquote><span style="font-weight: 400;">This year, the national-level Techno-Management fest has garnered sponsorships from IBM, Casio, Nikon, PayPal, Cisco, INOX, Byju’s, Microsoft and The Hindu, a few names among other famous investors. Highlights, Workshops, Championships, Initiatives, Challenges, and Events are the groups that will be heading all the activities performed on campus.</span><img class="aligncenter" src="https://scontent-lga3-1.cdninstagram.com/vp/3ecb62242067c6741e0a74f5f84145cf/5E23D885/t51.2885-15/e35/71141368_553397728736417_5185856855129644650_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&amp;_nc_cat=105" width="720" height="891"/><h4 style="text-align: center;"><span style="font-weight: 400;">Suresh Raina is the honorary guest who will inaugurate the fest on 26th September. </span></h4><img class="aligncenter" src="https://scontent.fmaa8-1.fna.fbcdn.net/v/t1.0-9/70852741_1441476349333686_2463993480397979648_o.jpg?_nc_cat=105&amp;_nc_oc=AQn4Pp6OAGOtAh8PXPaf32M2wx6V0JD2MhE1VzCENbBqc4QkTA3yN6YeH9kY659famU&amp;_nc_ht=scontent.fmaa8-1.fna&amp;oh=5067c13844bad6b488ae4b8eb7605e09&amp;oe=5E3D593F" alt="Image may contain: 7 people, text" width="720" height="240"/><span style="font-weight: 400;">The first Aaruush Musical Nite act is the home-grown band, Pakizah - an independent Hindi rock band that features lyrics that speak to the youth on a number of relatable subjects. Soulful tracks accompanied by poetic lyrics are sure to strum the strings of your heart! There’s a second act for you, the same evening! Up next, there’s BIG SAM- a four-piece acoustic-electro folk/pop/soul band that is influenced by the likes of John Mayer, Passenger, and Bon Iver. Two soul-stirring acts that are certain to leave you humming tunes long after the night has ended!</span><img class="aligncenter" src="https://scontent-lga3-1.cdninstagram.com/vp/f5e2dd8ce41b1e40d035748692add2c3/5E2B1ED7/t51.2885-15/e35/69359673_1162245007497221_2699586023597021275_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&amp;_nc_cat=105" width="720" height="509"/><span style="font-weight: 400;">On the third day of the fest, with a number of hits to his name, including the song “Woh Baarishein” singer Arjun Kanungo will be setting the stage on fire at the Aaruush Nites. On the 4th and the final day, the MHRD minister Dr. Ramesh Pokhriyal ‘Nishank’ is the guest of honor. At the Aaruush Nites, Abhishek Upamanyu will make you laugh until you\'re fighting to catch your breath. From a hilarious take on friends, crime, and people from all over the country, he\'s going to be there, having the audience of the thirteenth edition of the National Level Techno-Management Fest, in splits! An Aaruush Nite you cannot afford to miss!</span><img class="aligncenter" src="https://scontent.flko1-1.fna.fbcdn.net/v/t1.0-9/71241818_1440591669422154_1885312891427487744_n.jpg?_nc_cat=108&amp;_nc_oc=AQmJwIYmFsdvb9UrGarqSvoh21CF_gBlp53B9Sksy4tHmWbVbfadbGjZ2dnO_UShxbi1BaROByLYBXE-bGqnAsdC&amp;_nc_ht=scontent.flko1-1.fna&amp;oh=31d0b09d9ee1c4b596b54ee1da057730&amp;oe=5E32973E" alt="Image may contain: 1 person, text" width="721" height="509"/>&nbsp;<span style="font-weight: 400;">This is going to be an experience of a lifetime, especially for the freshers, as they’ll watch the first fest of their college taking place with all its glory! To get undisputed access to everything, there’s a simple but important task you need to do - the Common Registration. </span><img class="wp-image-6597 aligncenter" src="http://www.neuronerdz.com/wp-content/uploads/2019/09/aaruush.jpg" alt="" width="722" height="244"/><p style="text-align: center;"><span style="font-weight: 400;">Check out the official site <a href="https://www.aaruush.net/" target="_blank" rel="noopener noreferrer">AARUUSH \'19</a> </span><span style="font-weight: 400;">for further queries and information.</span></p><p style="text-align: center;">Image Credits: Aaruush Creatives</p>'),
            "blogCategory": {
                "main": [
                    "Education and Career"
                ],
                "sub": [
                    ""
                ]
            },
            "blogTagNames": [
                "#innovation", "#innovationaaruush", "aaruushaaruush 19", "aaruush 19","abhihek upamanyu", "abhihek upamanyuarjun", "kanungo arjun" ,"kanungobig" 
            ],
            "blogTitle": "AARUUSH 19 Rising In The Spirit Of Innovation",
            "blogAuthor": "maheshwari"
           
        }
    }
    componentDidMount(){
        axios.post("http://localhost:5300/addBlog",this.state.data).then(success=>{
            console.log("sucess",success)
        }).catch(err=>{
            if(err.response){
                console.log(err.response.data.message)
            }
            else{
                console.log("Server Error")
            }
        })
    }
    render(){
        return (
            <div>
               
            </div>
        )
    }
}