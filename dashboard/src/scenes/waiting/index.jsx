/*
 * @index.jsx Copyright(c) 2023 Jalasoft
 * 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
 * Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
 * All rights reserved
 * This software is the confidential and proprietary information of
 * Jalasoft,ConfidentialInformation"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Jalasoft
 */

import React from 'react';
import CountdownTimer from './CountDownTimer';
import meeting from "./meeting.json";

// Getting the first element of the meeting.json file
const actualMeeting = meeting[0];
// Split the start time of the meeting into an array of strings.
const meetingStartData = actualMeeting.start_time.split(" ");
const meetingHour = meetingStartData[0];
// Split the date into an array of strings with an specific separator.
const separator = "-";
let dates = actualMeeting.Date.split(separator);
// An array of months.
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
//An array of days of the week.
const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// Creating a new date object with the date and time of the meeting.
let dateObject = new Date(`${month[parseInt(dates[1])-1]} ${dates[2]}, ${dates[0]} ${meetingHour}:00`);
// Getting the day of the week in the meeting date.
let dayOfWeek = dateObject.getDay();
// Getting the time in milliseconds of the meeting date.
const meetingDateTime = dateObject.getTime();

export default function WaitingRoom() {
    return (
        <div >
            <h4 style={{textAlign: "center"}}>WAITING ROOM</h4>
            <h1 style={{textAlign: "center"}}>Your meeting is schedulet to:</h1>
            <h1 style={{textAlign: "center"}}>{daysInWeek[dayOfWeek]}, {month[parseInt(dates[1])-1]} {dates[2]} from {actualMeeting.start_time} to {actualMeeting.end_time}, {dates[0]}</h1>
            <CountdownTimer targetDate={meetingDateTime} />
            <h3 style={{textAlign: "center"}}>{actualMeeting.meeting_name}</h3>
            <h3 style={{textAlign: "center"}}>ID: {actualMeeting.id}</h3>
            <h3 style={{textAlign: "center"}}>Description: {actualMeeting.description}</h3>
            <h3 style={{textAlign: "center"}}>Time zone: {actualMeeting.time_zone}</h3>
            <h3 style={{textAlign: "center"}}>Host: {actualMeeting.host}</h3>
            <h3 style={{textAlign: "center"}}>Guests: {actualMeeting.quests.map((data) => (
                <li>{data.name}</li>
            ))}</h3>
        </div>
    );
  }