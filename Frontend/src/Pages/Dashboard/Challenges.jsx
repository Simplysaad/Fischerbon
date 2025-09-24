import React from 'react';
import DashboardLayout from './DashboardLayout';
import twoddrawing from './2ddrawings/Screenshot (1679).png'


const Challenges = () => {
    const quizzes = ['2d drawing', '3d drawing', 'isometric drawing']
    return (
        <>
            <DashboardLayout>
                <section className='grid md:grid-cols-2 grid-cols-1'>
                    {
                        quizzes.map((quiz, index) => {
                            return(
                                <img src={twoddrawing} className='m-5 w-[90%] rounded-lg' alt="" />
                            )
                        })
                    }
                </section>
            </DashboardLayout>
        </>
    );
}

export default Challenges;