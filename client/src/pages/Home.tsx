import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
    Stepper,
    Step,
    StepLabel,
    StepIcon,
    Button,
    Typography,
    Slider,
    Select,
    MenuItem,
} from '@mui/material'

const Home: React.FC = () => {
    const currentUser = useSelector((state: any) => state.user.currentUser)
    const [newUser, setNewUser] = useState<boolean>(currentUser.isNewUser)
    const [activeStep, setActiveStep] = useState(0)

    const [weight, setWeight] = useState<number>(130)
    const [height, setHeight] = useState<number>(185)

    const [targetWeight, setTargetWeight] = useState<number>(100)
    const [targetWater, setTargetWater] = useState<number>(3)

    const [activityLevel, setActivityLevel] = useState<string>('bmr')
    const [calories, setCalories] = useState<number>(2170)
    const [carbs, setCarbs] = useState<number>(205)
    const [proteins, setProteins] = useState<number>(180)
    const [fats, setFats] = useState<number>(70)

    const steps = ['Step 1', 'Step 2', 'Step 3']
    const activityLevels = {
        bmr: 'BMR',
        sedentary: 'Sedentary',
        light: 'Light',
        moderate: 'Moderate',
        active: 'Active',
        very_active: 'Very Active',
        extra_active: 'Extra Active',
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        if (activeStep === steps.length - 1) {
            setNewUser(false)
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleWeightChange = (
        event: React.ChangeEvent<NonNullable<unknown>>,
        value: number | number[]
    ) => {
        setWeight(value as number)
    }

    const handleHeightChange = (
        event: React.ChangeEvent<NonNullable<unknown>>,
        value: number | number[]
    ) => {
        setHeight(value as number)
    }

    const handleTargetWeightChange = (
        event: React.ChangeEvent<NonNullable<unknown>>,
        value: number | number[]
    ) => {
        setTargetWeight(value as number)
    }

    const handleTargetWaterChange = (
        event: React.ChangeEvent<NonNullable<unknown>>,
        value: number | number[]
    ) => {
        setTargetWater(value as number)
    }

    const handleActivityLevelChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setActivityLevel(event.target.value as string)
    }

    const handleCaloriesChange = (
        event: React.ChangeEvent<NonNullable<unknown>>,
        value: number | number[]
    ) => {
        setCalories(value as number)
    }

    const handleCarbsChange = (
        event: React.ChangeEvent<NonNullable<unknown>>,
        value: number | number[]
    ) => {
        setCarbs(value as number)
    }

    const handleProteinsChange = (
        event: React.ChangeEvent<NonNullable<unknown>>,
        value: number | number[]
    ) => {
        setProteins(value as number)
    }

    const handleFatsChange = (
        event: React.ChangeEvent<NonNullable<unknown>>,
        value: number | number[]
    ) => {
        setFats(value as number)
    }

    const getStepContent = (step: number) => {
        if (step === 0) {
            return (
                <div className='sliders-container'>
                    <h2>What is your current weight?</h2>
                    <Slider
                        aria-label='Weight'
                        defaultValue={80}
                        step={1}
                        color='secondary'
                        valueLabelDisplay='auto'
                        min={20}
                        max={200}
                        onChange={(event: any, value: number | number[]) =>
                            handleWeightChange(event, value)
                        }
                    />
                    <h2>What is your height?</h2>
                    <Slider
                        aria-label='Height'
                        defaultValue={170}
                        step={1}
                        color='secondary'
                        valueLabelDisplay='auto'
                        min={50}
                        max={275}
                        onChange={(event: any, value: number | number[]) =>
                            handleHeightChange(event, value)
                        }
                    />
                </div>
            )
        }
        if (step === 1) {
            return (
                <div className='sliders-container'>
                    <h2>What is your target weight?</h2>
                    <Slider
                        aria-label='Weight'
                        defaultValue={80}
                        step={1}
                        color='secondary'
                        valueLabelDisplay='auto'
                        min={20}
                        max={200}
                        onChange={(event: any, value: number | number[]) =>
                            handleTargetWeightChange(event, value)
                        }
                    />
                    <h2>What is your target daily water intake?</h2>
                    <Slider
                        aria-label='Height'
                        defaultValue={40}
                        step={1}
                        color='secondary'
                        valueLabelDisplay='auto'
                        min={20}
                        max={100}
                        onChange={(event: any, value: number | number[]) =>
                            handleTargetWaterChange(event, value)
                        }
                    />
                </div>
            )
        }
        if (step === 2) {
            return (
                <div className='sliders-container'>
                    <h2>What is your activity level?</h2>
                    <Select
                        style={{
                            width: '100%',
                        }}
                        value={activityLevel}
                        onChange={(event: any) =>
                            handleActivityLevelChange(event)
                        }
                        aria-label='Activity Level'>
                        {Object.entries(activityLevels).map(
                            ([key, value], index) => (
                                <MenuItem key={index} value={key}>
                                    {value}
                                </MenuItem>
                            )
                        )}
                    </Select>
                    <h2>What are your daily calorie & macro intake goals?</h2>
                    <div id='sliders-row'>
                        <div className='sliders-items'>
                            <h4>Calories</h4>
                            <Slider
                                aria-label='Calories'
                                defaultValue={2170}
                                step={1}
                                color='secondary'
                                valueLabelDisplay='auto'
                                min={500}
                                max={8000}
                                onChange={(
                                    event: any,
                                    value: number | number[]
                                ) => handleCaloriesChange(event, value)}
                            />
                        </div>
                        <div className='sliders-items'>
                            <h4>Carbs</h4>
                            <Slider
                                aria-label='Carbs'
                                defaultValue={205}
                                step={1}
                                color='secondary'
                                valueLabelDisplay='auto'
                                min={0}
                                max={600}
                                onChange={(
                                    event: any,
                                    value: number | number[]
                                ) => handleCarbsChange(event, value)}
                            />
                        </div>
                        <div className='sliders-items'>
                            <h4>Proteins</h4>
                            <Slider
                                aria-label='Height'
                                defaultValue={180}
                                step={1}
                                color='secondary'
                                valueLabelDisplay='auto'
                                min={0}
                                max={600}
                                onChange={(
                                    event: any,
                                    value: number | number[]
                                ) => handleProteinsChange(event, value)}
                            />
                        </div>
                        <div className='sliders-items'>
                            <h4>Fats</h4>
                            <Slider
                                aria-label='Fats'
                                defaultValue={70}
                                step={1}
                                color='secondary'
                                valueLabelDisplay='auto'
                                min={0}
                                max={600}
                                onChange={(
                                    event: any,
                                    value: number | number[]
                                ) => handleFatsChange(event, value)}
                            />
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div id='home-page'>
            {newUser ? (
                <>
                    <h3
                        style={{
                            padding: '1rem',
                        }}>
                        Let's Get to Know You Before Proceeding!
                    </h3>
                    <div id='new-user-bottom-container'>
                        <Stepper
                            activeStep={activeStep}
                            alternativeLabel
                            style={{
                                width: '100%',
                            }}>
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel
                                        StepIconComponent={(props) => (
                                            <StepIcon
                                                {...props}
                                                style={{
                                                    width: 30,
                                                    height: 30,
                                                }}
                                            />
                                        )}>
                                        {label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <div id='steps-content-btns'>
                            {getStepContent(activeStep)}
                            <div id='back-next-buttons'>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}>
                                    Back
                                </Button>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={handleNext}>
                                    {activeStep === steps.length - 1
                                        ? 'Finish'
                                        : 'Next'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                // Dashboard goes here
                <h3>Welcome back!</h3>
            )}
        </div>
    )
}

export default Home
