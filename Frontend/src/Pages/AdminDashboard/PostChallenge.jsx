import React, { useState } from 'react';
import AdminDashboardLayout from './AdminDashboardLayout';
import Start from './Start';
import { Puzzle, Upload } from 'lucide-react';
import AuthAlert from '../../Components/AuthAlert';
import AdminButton from './AdminButton';

const PostChallenge = () => {
    const [state, setState] = useState(true)
    const labelStyle = "text-gray font-serif leading-9 md:text-lg text-md"
    const inputStyle = "text-white text-[16px] py-3 px-3 rounded-sm w-[102px] bg-primary font-medium hover:bg-primaryHover ease-in-out duration-300 cursor-pointer mt-2"
    const [fileChoosen, setFileChoosen] = useState(false);
    const [alert, setAlert] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    let challenge = File;

    // setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/challenge/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(challenge),
      });

      const result = response.json();

      if(!result.success){
        setAlert('failure');
      } else{
          setAlert('success');
      }

    } catch (error) {
        setAlert('network')
        // console.log(error)
    } 
    // finally {
    //     setLoading(false);
    // }    
  };

    return (
        <>
            {
                alert === 'success' && fileChoosen ? <AuthAlert header={'Logged In'} message={'You can now access your dashboard'} iconType={'success'} border={'#3c97d0'} onClose={() => setAlert('')}/> 
                :
                alert === 'failure' && fileChoosen ? <AuthAlert header={'Oops'} message={"Something went wrong, try that again later"} iconType={'error'} onClose={() => setAlert('')}/> 
                :
                alert === 'network' && fileChoosen ? <AuthAlert header={'Network Error'} message={"You're not connected to the internet"} iconType={'error'} onClose={() => setAlert('')}/> 
                :
                ''
            }
            <AdminDashboardLayout>
                <div className='bg-[#F1F2F3] rounded-lg p-3'>
                    {state ? <Start Icon={Puzzle} message="You haven't posted any challenges yet" button="Post your first challenge" onClick={() => setState(false)}/>
                        :
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="challenge"
                                className={labelStyle}
                            >
                                Upload Challenge
                            </label>
                            <div className='border-3 border-accent p-10 border-double space-y-5 flex-col justify-center text-center rounded-2xl focus:border-primary transition-colors duration-200 ease-in-out'>
                                {!fileChoosen ? 
                                <>
                                    <div className="size-15 mx-auto rounded-full text-secondary bg-[#c1d4de] flex items-center justify-center">
                                        <Upload size="24" />
                                    </div>
                                    <p className="my-4 md:text-lg font-serif">Upload a challenge image [MAX - 10MB]</p>
                                    <input
                                        id="challenge"
                                        // onChange={() => {
                                        //  handleImageChange
                                        // }}
                                        name="challenge"
                                        type="file"
                                        accept="image/*"
                                        className={inputStyle}
                                    />
                                    {/* {challenge && (
                                        <img
                                        src={challengePreview}
                                        style={{
                                            width: `100%`,
                                            height: `auto`,
                                        }}
                                        alt="challenge"
                                        />
                                    )} */}
                                </>
                                :
                                <>Image</>
                                }
                            </div>
                    </div>  
                        <AdminButton text={!state ? 'Posting...' : 'Post Challenge'} disabled={state}/>
                    </form>
                    }
                </div>
            </AdminDashboardLayout>
        </>
    );
}

export default PostChallenge;