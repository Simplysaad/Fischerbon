import React, { useState } from 'react';
import AdminDashboardLayout from './AdminDashboardLayout';
import Start from './Start';
import { Puzzle } from 'lucide-react';
import AuthAlert from '../../Components/AuthAlert';
import AdminButton from './AdminButton';

const AddChallenge = () => {
    const [state, setState] = useState(true)
    const labelStyle = "text-gray font-serif leading-9 md:text-lg text-md"
    const inputStyle = "h-[250px] w-full p-3 border-2 border-[#C8CDD0] rounded-lg outline-none placeholder:text-[#ACB4B9] text-[16px] leading-6 focus:border-primary transition-colors duration-200 ease-in-out"

    return (
        <>
            <AdminDashboardLayout>
                <div className='bg-[#F1F2F3] rounded-lg p-3'>
                    {state ? <Start Icon={Puzzle} message="You haven't posted any challenges yet" button="Post your first challenge" onClick={() => setState(false)}/>
                        :

                    <div>
                        <div>
                            <label
                                htmlFor="challenge"
                                className={labelStyle}
                            >
                                Upload Challenge
                            </label>
                            <input
                                id="challenge"
                                // onChange={(e) => {
                                //   setThumbnail(e.target.files[0])
                                // }}
                                // onChange={() => {
                                //  handleImageChange
                                // }}
                                name="challenge"
                                type="file"
                                accept="image/*"
                                placeholder="Upload a challenge image for students"
                                className={inputStyle}
                            />
                            {/* {data.thumbnail && (
                                <img
                                src={data.thumbnailPreview}
                                style={{
                                    width: `100%`,
                                    height: `auto`,
                                }}
                                alt="thumbnail"
                                />
                            )} */}
                        </div>
                        <AdminButton text={state ? 'Posting...' : 'Post Challenge'} disabled={state}/>
                    </div>
                    }
                </div>
            </AdminDashboardLayout>
        </>
    );
}

export default AddChallenge;