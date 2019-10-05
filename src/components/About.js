import React from 'react'

export default class About extends React.Component {

    render() {
        return (
            <React.Fragment>
                <header className="entry-header">
                    <h1 className="entry-title">About Us</h1>
                </header>
                <div className="entry-content">
                    <br />
                    <p>
                        <img className="" src="../images/aboutcollage.jpg" data-lazy-type="image" data-src="http://www.neuronerdz.com/wp-content/uploads/2019/09/Capture1-300x168.jpg" alt="" width="772" height="433" srcSet="" data-srcset="https://www.neuronerdz.com/wp-content/uploads/2019/09/Capture1-300x168.jpg 300w, https://www.neuronerdz.com/wp-content/uploads/2019/09/Capture1-200x112.jpg 200w, https://www.neuronerdz.com/wp-content/uploads/2019/09/Capture1-768x430.jpg 768w, https://www.neuronerdz.com/wp-content/uploads/2019/09/Capture1-1024x573.jpg 1024w, https://www.neuronerdz.com/wp-content/uploads/2019/09/Capture1.jpg 1585w" sizes="(max-width: 772px) 100vw, 772px" />
                        <noscript>
                            <img className="wp-image-6185 aligncenter" src="http://www.neuronerdz.com/wp-content/uploads/2019/09/Capture1-300x168.jpg" alt="" width="772" height="433" srcset="https://www.neuronerdz.com/wp-content/uploads/2019/09/Capture1-300x168.jpg 300w, https://www.neuronerdz.com/wp-content/uploads/2019/09/Capture1-200x112.jpg 200w, https://www.neuronerdz.com/wp-content/uploads/2019/09/Capture1-768x430.jpg 768w, https://www.neuronerdz.com/wp-content/uploads/2019/09/Capture1-1024x573.jpg 1024w, https://www.neuronerdz.com/wp-content/uploads/2019/09/Capture1.jpg 1585w" sizes="(max-width: 772px) 100vw, 772px" />
                        </noscript>
                    </p>
                    <br />
                    <h2>About Neuronerdz</h2>
                    <p>Neuronerdz is a community of 100+ <strong>nerdz</strong> that wishes to penetrate the blogging
                    culture in India and subsequently the world with a simple goal in mind: To provide fantastic
                    content, curated by the people that most understand
                    their current generation audience. Neuronerdz wishes to create a youthful brand with content
                    emerging from a diverse array of youth across the country and hopefully, one day around the globe.</p>
                    <h2>Aim</h2>
                    <p>While Neuronerdz recognizes it’s goal to provide quality original material as its primary objective it also wishes to create a medium for reliable, accurate and extremely resourceful marketing via its blogging services, hence proving the uniqueness and importance of a youthful organisation that is competent in real-world scenarios.</p>
                    <h2>Why join us?</h2>
                    <p>It is true, that there is no shortage of blogging sites that one can have the option of joining; however, Neuronerdz provides for transparency of process, that none of the media behemoths can provide. It will allow the blogger to benefit from the learning curve that Neuronerdz is climbing at a quick speed and allows one to take credit for the success of what we hope, will be an organisation recognized by many. We aim to learn and let learn.</p>
                    <p>Every blogger at Neuronerdz gets due credit for the blogs they write so this is your opportunity to use the resources we have, and to create an audience for your category of blogging, hopefully, for which you become the gold standard of writing.</p>
                    <h3><strong>We look forward to having you on board for this journey and wish you the best of luck for all your endeavours. The Neuronerdz team awaits, are you ready to create magic with us?</strong></h3>
                    <div className="contain" >
                        {/* style="background: url('https://www.neuronerdz.com/wp-content/uploads/2018/01/f-1.jpg') no-repeat; width: 100%; min-height: 300px; background-size: cover; background-position: right;" */}
                        <div></div>
                        <div className="join-head" >Want To Work With Us?</div>
                        {/* style="color: #91bbde; font-size: 50px; font-family: tamoha; margin-top: 120px; margin-left: 44px; line-height: 50px;" */}
                        <p>
                            <a href="https://tiny.cc/team-nn"><button className="buttn" >Join Us</button><br />
                                {/* style="margin-top: 30px; margin-left: 25%; text-aligh: center; position: relative; display: block; float: none; padding: 15px 40px; border-radius: 8px; color: white; background: rgba(0,0,0,0.5); border: none;" */}
                            </a>
                        </p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}