import React, { useState } from 'react'
import PageComponent from '../components/PageComponent'
import { useStateContext } from '../contexts/ContextProvider';
import SurveyListItem from '../components/SurveyListItem';

export default function Surveys() {


  const {surveys} = useStateContext();

  console.log(Surveys);

  const onDeleteClick = () => {
    console.log("On Delete click");
  }


  return <PageComponent title = 'Surveys'>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 ' >
      {surveys.map(survey => (
        <SurveyListItem survey={survey} key={survey.id} onDeleteClick={onDeleteClick} />       
        ))}
        </div>
   </PageComponent>
    
}
