import React from 'react';
import DashboardLayout from './DashboardLayout';

const Quizzes = () => {
    const quizzes = ['2d drawing', '3d drawing', 'isometric drawing']
    return (
        <>
            <DashboardLayout>
                <section className='grid md:grid-cols-2 grid-cols-1'>
                    {
                        quizzes.map((quiz, index) => {
                            return(
                                <div className='bg-primary text-center md:p-20 p-15 m-5 rounded-xl cursor-pointer hover:bg-primaryHover ease-in-out transition-all duration-300'>
                                    <h4 className='text-4xl text-white'>{quiz.toLocaleUpperCase()}</h4>
                                </div>
                            )
                        })
                    }
                </section>
            </DashboardLayout>
        </>
    );
}

export default Quizzes;