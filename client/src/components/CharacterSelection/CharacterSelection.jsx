import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import { BsArrowRightShort } from 'react-icons/bs'
import MaleKnight from '../../assets/male-knight.png'
import FemaleKnight from '../../assets/female-knight.png'
import MaleGunslinger from '../../assets/male-gunslinger.png'
import FemaleGunslinger from '../../assets/female-gunslinger.png'
import MaleArcher from '../../assets/male-archer.png'
import FemaleArcher from '../../assets/female-archer.png'
import MaleThief from '../../assets/male-thief.png'
import FemaleThief from '../../assets/female-thief.png'
import MaleWarrior from '../../assets/male-warrior.png'
import FemaleWarrior from '../../assets/female-warrior.png'
import MaleBerserker from '../../assets/male-berserker.png'
import FemaleBerserker from '../../assets/female-berserker.png'
import MaleBlackMage from '../../assets/male-black-mage.png'
import FemaleBlackeMage from '../../assets/female-black-mage.png'
import MaleWhiteMage from '../../assets/male-white-mage.png'
import FemaleWhiteMage from '../../assets/female-white-mage.png'
import bg_video from '../../assets/character_creation_screen.mp4'
import * as yup from 'yup'
import './CharacterSelection.css'

function CharacterSelection({ setfFadeIn, jobData, addCharacter }) {
    const [characterSelectionBG, setCharacterSelectionBG] = useState(false)
    const [confirm, setConfirm] = useState(false)
    console.log(confirm)
    const navigate = useNavigate()

    useEffect(() => {

        setTimeout(() => {
            setfFadeIn(false)
        }, 1);

        setTimeout(() => {
            setCharacterSelectionBG(true);
        }, 1000);

        const fadeOutTimeout = setTimeout(() => {
            setfFadeIn(true)
        }, 1500);

        return () => {
            clearTimeout(fadeOutTimeout);
        };
    }, []);

    const handleConfirm = () => {
        setConfirm(true)
    }

    const handleCancel = () => {
        setConfirm(false)
    }

    const showConfirm = confirm ? "block z-index0 confirmBox absolute w-full h-full top-0 right-0 z-index-2" : "hidden"

    const formSchema = yup.object().shape({
        character_name: yup.string().required("Please enter a username."),
        pronouns: yup.string().required("Please enter your pronouns."),
        sex: yup.mixed().oneOf(['male', 'female']).required('Please select your sex.'),
        region: yup.string().required("Please enter region."),
        job_stats_id: yup.number().required("Please choose job.")
    })

    const formik = useFormik({
        initialValues: {
            character_name: "",
            pronouns: "",
            sex: "Male",
            region: "",
            job_stats_id: 1,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log("Hello")
            console.log(values)
            fetch('/new_character', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    job_stats_id: parseInt(values.job_stats_id) // convert to integer
                })
            })
                .then(resp => resp.json())
                .then(character => {
                    addCharacter(character)
                    navigate("/game")
                })
        }
    })

    const showCharacterSelect = characterSelectionBG ? "opacity-1" : 'opacity-0'


    return (
        <div className={`CharacterSelection h-full bg-img flex flex-col ${showCharacterSelect}`}>
            <div id='background-video'>
                <video autoPlay loop muted>
                    <source src={bg_video} />
                </video>
            </div>
            <div className='ps-40 flex flex-row h-full'>
                <div className='personal-information basis-1/2 py-10'>
                    <h1 className='text-white text-lg pb-5'>DATABASE: <span className='ms-4'>PERSONAL INFORMATION</span></h1>
                    <form className='basis-1/2 flex flex-row flex-wrap' onSubmit={formik.handleSubmit}>
                        {formik.errors && (
                            <>
                                <div className='basis-1/3 flex flex-col'>
                                    <label htmlFor="character_name">USERNAME:</label>
                                    <label htmlFor="pronouns">PRONOUNS:</label>
                                    <label htmlFor="region">REGION:</label>
                                    <label htmlFor="sex">SEX:</label>
                                    <label htmlFor="job_stats_id">JOB:</label>
                                </div>
                                <div className='basis-1/3 flex flex-col'>
                                    <input
                                        className='border rounded-0 text-black'
                                        type="text"
                                        id='character_name'
                                        name='character_name'
                                        placeholder='Username'
                                        onChange={formik.handleChange}
                                        value={formik.values.character_name}
                                    />
                                    <span>{formik.errors.character_name}</span>
                                    <input
                                        className='border rounded-0 text-black'
                                        type="text"
                                        id='pronouns'
                                        name='pronouns'
                                        placeholder='Pronouns'
                                        onChange={formik.handleChange}
                                        value={formik.values.pronouns}
                                    />
                                    <span>{formik.errors.pronouns}</span>
                                    <select id='region' name="region" value={formik.values.region} onChange={formik.handleChange}>
                                        <option value="Nemar">Nemar</option>
                                        <option value="Cyneil">Cyneil</option>
                                        <option value="Corize">Corize</option>
                                        <option value="Naurra Isles">Naurra Isles</option>
                                        <option value="Ausstero">Ausstero</option>
                                    </select>
                                    <span>{formik.errors.region}</span>
                                    <div className="sex">
                                        <input
                                            className='form-check-input'
                                            type="radio"
                                            id='male'
                                            name="sex"
                                            value="male"
                                            onChange={formik.handleChange}
                                            checked={formik.values.sex === 'male'}
                                        />
                                        <label className='form-check-label' htmlFor="male">Male</label>
                                        <input
                                            className='form-check-input'
                                            type="radio"
                                            id='female'
                                            name="sex"
                                            value="female"
                                            onChange={formik.handleChange}
                                            checked={formik.values.sex === 'female'}
                                        />
                                        <label className='form-check-label' htmlFor="female">Female</label>
                                    </div>
                                    <span>{formik.errors.sex}</span>
                                </div>
                                <div className='job basis-full pt-10 flex flex-wrap'>
                                    <input
                                        type="radio"
                                        id="jobStat-1"
                                        name='job_stats_id'
                                        {...formik.getFieldProps('job_stats_id')}
                                        value="1"
                                    />
                                    <label htmlFor="jobStat-1">
                                        {formik.values.sex === "male" ? <img src={MaleKnight} alt="" /> : <img src={FemaleKnight} alt="" />}
                                    </label>

                                    <input
                                        type="radio"
                                        id="jobStat-2"
                                        name='job_stats_id'
                                        {...formik.getFieldProps('job_stats_id')}
                                        value="2"
                                    />
                                    <label htmlFor="jobStat-2">
                                        {formik.values.sex === "male" ? <img src={MaleGunslinger} alt="" /> : <img src={FemaleGunslinger} alt="" />}
                                    </label>

                                    <input
                                        type="radio"
                                        id="jobStat-3"
                                        name='job_stats_id'
                                        {...formik.getFieldProps('job_stats_id')}
                                        value="3"
                                    />
                                    <label htmlFor="jobStat-3">
                                        {formik.values.sex === "male" ? <img src={MaleArcher} alt="" /> : <img src={FemaleArcher} />}
                                    </label>

                                    <input
                                        type="radio"
                                        id="jobStat-4"
                                        {...formik.getFieldProps('job_stats_id')}
                                        value="4"
                                    />
                                    <label htmlFor="jobStat-4">
                                        {formik.values.sex === "male" ? <img src={MaleThief} alt="" /> : <img src={FemaleThief} />}
                                    </label>
                                </div>
                                <div className='job basis-full flex flex-wrap'>
                                    <input
                                        type="radio"
                                        id="jobStat-5"
                                        {...formik.getFieldProps('job_stats_id')}
                                        value="5"
                                    />
                                    <label htmlFor="jobStat-5">
                                        {formik.values.sex === "male" ? <img src={MaleWarrior} alt="" /> : <img src={FemaleWarrior} />}
                                    </label>
                                    <input
                                        type="radio"
                                        id="jobStat-6"
                                        {...formik.getFieldProps('job_stats_id')}
                                        value="6"
                                    />
                                    <label htmlFor="jobStat-6">
                                        {formik.values.sex === "male" ? <img src={MaleBerserker} alt="" /> : <img src={FemaleBerserker} />}
                                    </label>
                                    <input
                                        type="radio"
                                        id="jobStat-7"
                                        {...formik.getFieldProps('job_stats_id')}
                                        value="7"
                                    />
                                    <label htmlFor="jobStat-7">
                                        {formik.values.sex === "male" ? <img src={MaleBlackMage} alt="" /> : <img src={FemaleBlackeMage} />}
                                    </label>
                                    <input
                                        type="radio"
                                        id="jobStat-8"
                                        {...formik.getFieldProps('job_stats_id')}
                                        value="8"
                                    />
                                    <label htmlFor="jobStat-8">
                                        {formik.values.sex === "male" ? <img src={MaleWhiteMage} alt="" /> : <img src={FemaleWhiteMage} />}
                                    </label>
                                </div>
                                <span>{formik.errors.job_stats_id}</span>

                            </>
                        )}
                        <button className='mt-4 border rounded-full p-1' type='button' onClick={handleConfirm}><BsArrowRightShort size={24} /></button>
                        <div className={`${showConfirm}`}>
                            <div className='w-full h-full flex items-center justify-center flex-col'>
                                <div className='textBox text-center'>
                                    <h2 className='text-white mb-5'>Are you sure?</h2>
                                    <div className='felx flex row'>
                                        <button className='me-5' type='submit'>Confirm</button>
                                        <button type='button' onClick={handleCancel}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='job-stats basis-1/2 py-10 '>
                    {formik.values.job_stats_id === '1' ? (
                        <div className="show-stats h-100 flex flex-col">
                            <h1 className='text-7xl text-white pb-10'>{jobData[0].job}</h1>
                            <span>LVL: {jobData[0].lvl}</span>
                            <span>HP: {jobData[0].hp}</span>
                            <span>MP: {jobData[0].mg}</span>
                            <span>STR: {jobData[0].strg}</span>
                            <span>DEF: {jobData[0].defn}</span>
                            <span>INT: {jobData[0].intl}</span>
                            <span>MND: {jobData[0].mind}</span>
                            <span>SPD: {jobData[0].spd}</span>
                            <span>EVA: {jobData[0].evad}</span>
                        </div>
                    ) : null}
                    {formik.values.job_stats_id === '2' ? (
                        <div className="show-stats h-100 flex flex-col">
                            <h1 className='text-7xl text-white pb-10'>{jobData[1].job}</h1>
                            <span>LVL: {jobData[1].lvl}</span>
                            <span>HP: {jobData[1].hp}</span>
                            <span>MP: {jobData[1].mg}</span>
                            <span>STR: {jobData[1].strg}</span>
                            <span>DEF: {jobData[1].defn}</span>
                            <span>INT: {jobData[1].intl}</span>
                            <span>MND: {jobData[1].mind}</span>
                            <span>SPD: {jobData[1].spd}</span>
                            <span>EVA: {jobData[1].evad}</span>
                        </div>
                    ) : null}
                    {formik.values.job_stats_id === '3' ? (
                        <div className="show-stats h-100 flex flex-col">
                            <h1 className='text-7xl text-white pb-10'>{jobData[2].job}</h1>
                            <span>LVL: {jobData[2].lvl}</span>
                            <span>HP: {jobData[2].hp}</span>
                            <span>MP: {jobData[2].mg}</span>
                            <span>STR: {jobData[2].strg}</span>
                            <span>DEF: {jobData[2].defn}</span>
                            <span>INT: {jobData[2].intl}</span>
                            <span>MND: {jobData[2].mind}</span>
                            <span>SPD: {jobData[2].spd}</span>
                            <span>EVA: {jobData[2].evad}</span>
                        </div>
                    ) : null}
                    {formik.values.job_stats_id === '4' ? (
                        <div className="show-stats h-100 flex flex-col">
                            <h1 className='text-7xl text-white pb-10'>{jobData[3].job}</h1>
                            <span>LVL: {jobData[3].lvl}</span>
                            <span>HP: {jobData[3].hp}</span>
                            <span>MP: {jobData[3].mg}</span>
                            <span>STR: {jobData[3].strg}</span>
                            <span>DEF: {jobData[3].defn}</span>
                            <span>INT: {jobData[3].intl}</span>
                            <span>MND: {jobData[3].mind}</span>
                            <span>SPD: {jobData[3].spd}</span>
                            <span>EVA: {jobData[3].evad}</span>
                        </div>
                    ) : null}
                    {formik.values.job_stats_id === '5' ? (
                        <div className="show-stats h-100 flex flex-col">
                            <h1 className='text-7xl text-white pb-10'>{jobData[4].job}</h1>
                            <span>LVL: {jobData[4].lvl}</span>
                            <span>HP: {jobData[4].hp}</span>
                            <span>MP: {jobData[4].mg}</span>
                            <span>STR: {jobData[4].strg}</span>
                            <span>DEF: {jobData[4].defn}</span>
                            <span>INT: {jobData[4].intl}</span>
                            <span>MND: {jobData[4].mind}</span>
                            <span>SPD: {jobData[4].spd}</span>
                            <span>EVA: {jobData[4].evad}</span>
                        </div>
                    ) : null}
                    {formik.values.job_stats_id === '6' ? (
                        <div className="show-stats h-100 flex flex-col">
                            <h1 className='text-7xl text-white pb-10'>{jobData[5].job}</h1>
                            <span>LVL: {jobData[5].lvl}</span>
                            <span>HP: {jobData[5].hp}</span>
                            <span>MP: {jobData[5].mg}</span>
                            <span>STR: {jobData[5].strg}</span>
                            <span>DEF: {jobData[5].defn}</span>
                            <span>INT: {jobData[5].intl}</span>
                            <span>MND: {jobData[5].mind}</span>
                            <span>SPD: {jobData[5].spd}</span>
                            <span>EVA: {jobData[5].evad}</span>
                        </div>
                    ) : null}
                    {formik.values.job_stats_id === '7' ? (
                        <div className="show-stats h-100 flex flex-col">
                            <h1 className='text-7xl text-white pb-10'>{jobData[6].job}</h1>
                            <span>LVL: {jobData[6].lvl}</span>
                            <span>HP: {jobData[6].hp}</span>
                            <span>MP: {jobData[6].mg}</span>
                            <span>STR: {jobData[6].strg}</span>
                            <span>DEF: {jobData[6].defn}</span>
                            <span>INT: {jobData[6].intl}</span>
                            <span>MND: {jobData[6].mind}</span>
                            <span>SPD: {jobData[6].spd}</span>
                            <span>EVA: {jobData[6].evad}</span>
                        </div>
                    ) : null}
                    {formik.values.job_stats_id === '8' ? (
                        <div className="show-stats h-100 flex flex-col">
                            <h1 className='text-7xl text-white pb-10'>{jobData[7].job}</h1>
                            <span>LVL: {jobData[7].lvl}</span>
                            <span>HP: {jobData[7].hp}</span>
                            <span>MP: {jobData[7].mg}</span>
                            <span>STR: {jobData[7].strg}</span>
                            <span>DEF: {jobData[7].defn}</span>
                            <span>INT: {jobData[7].intl}</span>
                            <span>MND: {jobData[7].mind}</span>
                            <span>SPD: {jobData[7].spd}</span>
                            <span>EVA: {jobData[7].evad}</span>
                        </div>
                    ) : null}
                    {formik.values.job_stats_id === '9' ? (
                        <div className="show-stats h-100 flex flex-col">
                            <h1 className='text-7xl text-white pb-10'>{jobData[8].job}</h1>
                            <span>LVL: {jobData[8].lvl}</span>
                            <span>HP: {jobData[8].hp}</span>
                            <span>MP: {jobData[8].mg}</span>
                            <span>STR: {jobData[8].strg}</span>
                            <span>DEF: {jobData[8].defn}</span>
                            <span>INT: {jobData[8].intl}</span>
                            <span>MND: {jobData[8].mind}</span>
                            <span>SPD: {jobData[8].spd}</span>
                            <span>EVA: {jobData[8].evad}</span>
                        </div>
                    ) : null}
                </div>
            </div>

        </div >
    )
}

export default CharacterSelection