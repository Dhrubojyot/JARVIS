const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
let isListening = false;
let recognitionInProgress = false;




function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 0.75;   // Slower, more deliberate speech
    text_speak.volume = 1;    // Maximum volume (volume ranges from 0 to 1)
    text_speak.pitch = 1; 
    window.speechSynthesis.speak(text_speak);

    text_speak.onend = () => {
        content.textContent = "Listening..."; 
        recognition.start(); // Automatically start listening again after speaking
    };
}

function wishMe(){
    var day = new Date();
    var hour = day.getHours();
    if(hour >= 0 && hour < 12){
        speak("Good Morning SIR...");
    } else if(hour >= 12 && hour < 18){
        speak("Good Afternoon Sir...");
    } else {
        speak("Good Evening Sir...");
    }
}

function playAudioOnce() {
    const audioElement = document.getElementById('jarvisAudio');
    
    // Set volume to maximum (1 is the max volume)
    audioElement.volume = 1;
    

}

// Call the function to handle audio playback
playAudioOnce();

//window.addEventListener('load', ()=>{
    //speak("INITIALIZING JARVIS, I am an AI Assistant of Technique Polytechnic Institute");
    //wishMe();
//});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onresult = (event)=>{
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
}
btn.addEventListener('click', () => {
    recognition.start();
    content.textContent = "Listening...";
});

// Array of questions for JARVIS to ask
const questions = [
    "Sir, it has been a while since your last command. How may I assist you further?",
    "Is there anything specific you need help with at the moment sir?",
    "Sir Would you like to know more about the latest updates?",
    "Can I provide you with information on any specific topic?",
];

// Function for JARVIS to ask a question
function jarvisAsk() {
    // Select a random question from the array
    const question = questions[Math.floor(Math.random() * questions.length)];
    console.log(question);
    // Use text-to-speech to ask the question aloud
    const utterance = new SpeechSynthesisUtterance(question);
    window.speechSynthesis.speak(utterance); 
    utterance.onend = () => {
        content.textContent = "Listening..."; 
        recognition.start(); // Automatically start listening again after speaking
    };
    
}

// Function to start asking questions at 2 and 3-minute intervals
function startAskingQuestions() {
    // Ask the question after 2 minutes
    setTimeout(() => {
        jarvisAsk();
        // Continue asking every 2 minutes after the initial 2-minute delay
        setInterval(jarvisAsk, 120000);  // 2 minutes in milliseconds
    }, 120000);  // 2 minutes in milliseconds

    // Ask the question after 3 minutes
    setTimeout(() => {
        jarvisAsk();
        // Continue asking every 3 minutes after the initial 3-minute delay
        setInterval(jarvisAsk, 180000);  // 3 minutes in milliseconds
    }, 180000);  // 3 minutes in milliseconds
}

// Call the function to start the timers
startAskingQuestions();

function sendLocationToWhatsApp() {
    // Check if geolocation is supported
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

function makePhoneCall(phoneNumber) {
    window.open(`tel:${phoneNumber}`);
}

function calculate(expression) {
    try {
        // Evaluate the mathematical expression
        expression = expression.replace(/x/gi, "*");
        let result = eval(expression);
        return `Sir, The result of ${expression} is ${result}`;
    } catch (error) {
        return "Sorry sir, I couldn't understand that.";
    }
}

function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    // Create Google Maps link with coordinates
    const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    
    // WhatsApp target number (replace with your target number)
    const targetNumber = "+919330857191"; // Replace with the target number
    
    // Pre-filled message with location link
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${targetNumber}&text=Here%20is%20my%20location:%20${encodeURIComponent(locationLink)}`;
    
    // Open WhatsApp with the message
    window.open(whatsappUrl, '_blank');
    
    // Optionally, speak a confirmation
    speak("Sending your location Sir");
}

function errorCallback() {
    alert("Unable to retrieve your location.");
}




function takeCommand(message){



    function pronounceName(name) {
        if (name == "Dhrubojyoti Chakraborty") {
          return "Droo-boh-jyoh-tee Chah-krah-bor-tee";
        } else {
          return "Unknown name";
        }
    }
      
    if (message.includes("who created you")) {
        namePronunciation = pronounceName("Dhrubojyoti Chakraborty");
        speak("I am created by Three Computer Science Engineering Students of Technique Polytechnic Institute. " + namePronunciation + ", Jeet Sarkar and Dhruboo Singhaa Roy");
 }

else if (message.includes("send my location") || message.includes("send location") || message.includes("location")) {
    sendLocationToWhatsApp();
} 

else if (message.includes("jarvis calculate") || message.includes("calculate")) {
    // Extract the part after "calculate"
    let expression = message.replace("jarvis calculate","").trim();
    let result = calculate(expression);
    speak(result);
} 
else if (message.includes("call") && message.includes("jeet")) {
    speak("Calling Jeet right now, sir.");
    makePhoneCall("+919330857191"); // Replace with Jeet's actual phone number
 // Trigger the call to Jeet
}

    else if(message.includes('hello jarvis') || message.includes('hey')){
        speak("Welcome Home Sir, How May I Help You..?");
    }

    else if (message.includes("say hello to everyone")|| message.includes("say")) {
        speak("Hello everyone, I am JARVIS, your virtual artificial intelligence assistant. My primary function is to assist and provide information with the utmost efficiency. If there is anything you need or any queries you have, please feel free to ask. How may I assist you today?");
    }
    else if(message.includes("jarvis, can you make a random choice between Tea or Coffee") || message.includes('tea or coffee')){
        speak("Calculating sir... I choose Coffee, Would you like a cup now?");
    }

    else if(message.includes('tell about tpi') || message.includes('tell about tpi')){
        speak("Technique Polytechnic Institute, located in West Bengal, is a renowned institution providing excellent technical education. We offer diploma courses in computer science, mechanical engineering, and more. Would you like to know sir more about our courses, facilities, or events?");
    }
    else if(message.includes("jarvis what is the attendance percentage required at TPI?") || message.includes('attendance')){
        speak("Okay sir, At Technique Polytechnic Institute, students are required to maintain a minimum of 75% attendance to sit for their exams.");
    }

    else if(message.includes('what is your name') || message.includes('who are you')){
        speak("Hello, my name is JARVIS. I am an Virtual AI Assistant of Technique Polytechnic Institute. I can provide you with information about the institute and help resolve any doubts you may have about the college.");
    }
    else if(message.includes("jarvis what is my routine today") || message.includes('routine today')){
        speak("Good morning, sir. You have no classes today. Instead, you’re scheduled to attend Technosphere at TPI’s science exhibition, where you’ll be showcasing me, as well as your other projects.");
        speak("I’ve also scheduled 30 minutes for lunch, although it’s optional.")
    }
    else if(message.includes('Anything important happening on tpi campus today?') || message.includes('tpi campus')){
        speak("Yes, today is Technosphere, a grand science exhibition at Technique Polytechnic Institute. It’s an exciting event where tech enthusiasts from different departments come together to showcase their innovative projects. You'll see a variety of cutting-edge ideas, from robotics and AI to electronics and software development, all being presented in the exhibition.");
    }
    else if(message.includes("jarvis, how is the crowd at Technosphere today") || message.includes('crowd at technosphere')){
        speak("The exhibition is drawing a large crowd, sir. Students, professors, and even a few industry professionals have shown up to see the projects. You’ll have a good audience for your demonstration.");
    }
    else if(message.includes("jarvis set a timer for my Machine Learning class this evening and also set a reminder for my Java class at 8 PM") || message.includes("set a timer for my class")){
        speak("Timer for your Machine Learning class is set, I’ve also scheduled a reminder for your Java class at 8 PM sir.");
    }

    else if(message.includes('do you know about tpi') || message.includes('about tpi')){
        speak("Yes Sir, Technique Polytechnic Institute is a co-educational private diploma engineering college located at Hooghly district in West Bengal, India, It is affiliated to West Bengal State Council of Technical Education and approved by All India Council for Technical Education. Technique Polytechnic Institute offers undergraduate diplomas in several streams. It also offers vocational training programmes in several courses. All full-time diploma engineering programs are accredited by the National Board of Accreditation.");
    }

    else if(message.includes("how is the weather today") || message.includes('weather today')){
        speak("Sir, The weather today is sunny with a chance of awesomeness, just like your coding skills!");
    }

    else if(message.includes('how many departments are there in tpi') || message.includes('department')){
        speak("Technique Polytechnic Institute (TPI) boasts seven highly demanding departments: Department of Computer Science & Technology, Department of Cyber Forensics and Information Security, Department of Electronics & Tele-Communication Engineering, Department of Electrical Engineering, Department of Mechanical Engineering, Department of Civil Engineering, and Department of Science & Humanities.");
    }

    else if(message.includes('what is the address of tpi') || message.includes('address of tpi')){
        speak("Here is the address of tpi. Hooghly Station Road, Post office: Sugandhya, Distict: Hooghly, Panchrokhi, State: West Bengal, PIN Number: 712102");
        speak('Phone Number: 0 9 8 3 0 4 8 2 0 9 6')
    }

    else if(message.includes('what is the fee structure of tpi') || message.includes('fee structure')){
        speak("You can find our fees structure on our website...");
        window.open("https://www.techniqueedu.com/fees-structure-regular", "_blank");
    }

    else if(message.includes('tell me the current vacancy of tpi') || message.includes('current vacancy')){
        speak("You can find our upcoming vacancies on our website...");
        window.open("https://www.techniqueedu.com/upcoming-vacancies", "_blank");
    }

      
    else if(message.includes('tell about the placement of tpi') || message.includes('placement')){
        speak("You can find our placement details on our website...");
        window.open("https://www.techniqueedu.com/placement-yearwise", "_blank");
    }

    else if(message.includes('show me the website of tpi') || message.includes('tpi website')){
        speak("Okay sir, Redirecting you to our website...");
        window.open("https://www.techniqueedu.com/", "_blank");
    }

    else if(message.includes('is polytechnic good for career') || message.includes('polytechnic good career')){
        speak("Yes, Polytechnic is a good career option after class 10th or 12th. After completing Polytechnic diploma you can directly enroll in the second year of BTech or Bachelor of Engineering, And technique polytechnic institute is the best option for it");
    }

    else if(message.includes('which polytechnic has highest salary') || message.includes('polytechnic highest salary')){
        speak("The highest salary for Polytechnic graduates typically depends on the specialization, industry demand, and geographic location. However, fields like Computer Science & Technology, Cyber Forensics and Information Security, and Electronics & Tele-Communication Engineering often lead to higher salary prospects due to the growing demand for skilled professionals in tech-driven industries.");
    }
    
    else if(message.includes('which is best polytechnic or iti') || message.includes('polytechnic or iti')){
        speak("ITI primarily provides skill-based training in specific trades, focusing on immediate employment in skilled trade jobs. Polytechnic, on the other hand, offers comprehensive education in engineering and technology disciplines, preparing students for higher education or technical roles in various industries.");
    }

    else if(message.includes('can I do polytechnic after 10th in tpi') || message.includes('polytechnic after 10')){
        speak("Absolutely! At Technique Polytechnic Institute (TPI), students can pursue a Polytechnic diploma right after completing their 10th grade. TPI offers a dynamic and comprehensive curriculum designed to provide hands-on experience and industry-relevant skills in various technical fields. This pathway allows students to kickstart their engineering careers early, gaining valuable expertise and a strong foundation");
        speak('TPI commitment to quality education ensures that students are well-prepared for future challenges and opportunities in their chosen fields.')
    }
    
    else if (message.includes('jarvis play my favourite music') || message.includes('favourite music')) {
    speak("Playing your favorite music sir...");
    window.open("https://www.youtube.com/watch?v=LKjaudObsMo", "_blank");
    }

    else if (message.includes('jarvis play some romantic music') || message.includes('romantic music')) {
        speak("Playing a romantic music for you sir...");
        window.open("https://www.youtube.com/watch?v=nCD2hj6zJEc", "_blank");
    }

    else if (message.includes('jarvis play some dancing music') || message.includes('dancing music')) {
        speak("Playing a energetic track for you sir...");
        window.open("https://www.youtube.com/watch?v=nFgsBxw-zWQ", "_blank");
    }

    
    else if(message.includes("open google")){
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    }

    else if(message.includes("open youtube")){
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    }

    else if(message.includes("open instagram")){
        window.open("https://instagram.com", "_blank");
        speak("Opening Instagram...");
    }

    else if(message.includes("open facebook")){
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    }


    else if(message.includes("open whatsapp")){
        window.open("https://whatsapp.com", "_blank");
        speak("Opening Whatsapp...");
    }

  

    else if(message.includes('wikipedia')){
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding" + message;
        speak(finalText);
    }

    else if(message.includes('tell about') || message.includes('say about') || message.includes('who') || message.includes('when') || message.includes('why')){
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding" + message;
        speak(finalText);
    }
    else if(message.includes('search for')|| message.includes("search on")) {
        const searchQuery = message.replace("youtube search for", "").trim().replace(" ", "+");
        window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, "_blank");
        const finalText = "This is what I found on YouTube regarding " + searchQuery.replace("+", " ");
        speak(finalText);
    }


    else if(message.includes('jarvis tell the current time') || message.includes("current time")){
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute:"numeric"})
        const finalText = `Sir, the current time is ${time} and today is ${new Date().toLocaleDateString()}.`;
        speak(finalText);
    }

    else if(message.includes("jarvis tell today's date") || message.includes("date")){
        const date = new Date().toLocaleString(undefined, {month:"short", day:"numeric"})
        const finalText = `Sir, today's date is ${date}`;
        speak(finalText);
    }

    else if(message.includes('open calculator')){
        window.open('Calculator:///')
        const finalText = "Opening Calculator...";
        speak(finalText);
    }
    else if(message.includes('thank you jarvis')){
        speak("You're welcome sir! If you need anything else, just let me know.");
    }
    

    else{
        speak("sir i didn't get you");
    }
    

    
   


}