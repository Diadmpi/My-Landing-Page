import { CourseModule } from '../types';

export const INITIAL_MODULES: CourseModule[] = [
  {
    id: 'mod1',
    title: 'Module 1: Introduction to Arduino & Microcontrollers',
    description: 'Learn the fundamentals of electronics, Arduino hardware, and writing your first sketch to control LEDs.',
    lessons: [
      {
        id: 'm1-l1',
        title: 'Class 1.1: What is Arduino and Microcontroller?',
        duration: '15 mins',
        videoUrl: 'https://www.youtube.com/embed/nL346HP_X_4', // Official Arduino tutorial
        pdfUrl: 'https://www.arduino.cc/en/Guide/HomePage',
        description: 'Understand the concept of open-source hardware, microcontrollers vs microprocessors, and Arduino Uno board layout.'
      },
      {
        id: 'm1-l2',
        title: 'Class 1.2: Arduino IDE Installation & Setup',
        duration: '12 mins',
        videoUrl: 'https://www.youtube.com/embed/Tb-fI7NclcI',
        pdfUrl: 'https://docs.arduino.cc/software/ide-v2',
        description: 'Learn how to install Arduino IDE, connect your Arduino board, choose COM ports, and navigate the environment.'
      },
      {
        id: 'm1-l3',
        title: 'Class 1.3: LED Blinking & Breadboard Basics',
        duration: '18 mins',
        videoUrl: 'https://www.youtube.com/embed/fAclCia_zS8',
        pdfUrl: 'https://docs.arduino.cc/built-in-examples/basics/Blink',
        description: 'Understand the breadboard connections, Ohm\'s law, resistors, and writing the famous Blink sketch in C++.'
      }
    ],
    quiz: {
      id: 'quiz1',
      questions: [
        {
          id: 'q1-1',
          question: 'What is the voltage output of a standard Arduino Uno digital pin when set to HIGH?',
          options: ['1.2V', '3.3V', '5V', '12V'],
          correctAnswer: 2
        },
        {
          id: 'q1-2',
          question: 'Which of the following functions is mandatory in an Arduino sketch?',
          options: ['loop() only', 'setup() only', 'Both setup() and loop()', 'start() and stop()'],
          correctAnswer: 2
        },
        {
          id: 'q1-3',
          question: 'What unit is used for resistors?',
          options: ['Volts', 'Amperes', 'Ohms', 'Watts'],
          correctAnswer: 2
        },
        {
          id: 'q1-4',
          question: 'Which function is used to configure a specific pin to behave either as an input or an output?',
          options: ['pinMode()', 'digitalWrite()', 'analogWrite()', 'setupPin()'],
          correctAnswer: 0
        }
      ]
    },
    assignment: {
      id: 'assign1',
      title: 'Assignment 1: Traffic Light Controller',
      description: 'Create a traffic light controller simulating Red, Yellow, and Green LEDs sequence on Tinkercad or real hardware.',
      problemStatement: 'Problem Statement: Connect 3 LEDs (Red, Yellow, Green) to Arduino pins 10, 11, and 12. Write a code where Red is ON for 5 seconds, Yellow for 2 seconds, and Green for 5 seconds, repeating indefinitely. Submit your Tinkercad circuit link OR copy-paste the C++ code.'
    }
  },
  {
    id: 'mod2',
    title: 'Module 2: Sensors: Reading the Environment',
    description: 'Explore digital and analog sensors. Learn how to interface LDR, Infrared, and Ultrasonic sensors with Arduino.',
    lessons: [
      {
        id: 'm2-l1',
        title: 'Class 2.1: Interfacing LDR (Light Sensor)',
        duration: '20 mins',
        videoUrl: 'https://www.youtube.com/embed/6gGIsN9Z6Zk',
        pdfUrl: 'https://docs.arduino.cc/built-in-examples/analog/AnalogInput',
        description: 'Learn how to read analog values from a Light Dependent Resistor (LDR) using analog pins and control an LED based on room light.'
      },
      {
        id: 'm2-l2',
        title: 'Class 2.2: Obstacle Detection with IR Sensor',
        duration: '16 mins',
        videoUrl: 'https://www.youtube.com/embed/6Y769a6Kx_E',
        pdfUrl: 'https://docs.arduino.cc/built-in-examples/digital/Button',
        description: 'Understand the working of an active infrared (IR) sensor, tuning its potentiometer, and reading digital input for obstacle detection.'
      },
      {
        id: 'm2-l3',
        title: 'Class 2.3: Distance Measurement with Ultrasonic Sensor (HC-SR04)',
        duration: '25 mins',
        videoUrl: 'https://www.youtube.com/embed/ZejQOXhyYBs',
        pdfUrl: 'https://docs.arduino.cc/built-in-examples/digital/StateChangeDetection',
        description: 'Master the Ultrasonic sonar sensor. Calculate distance using sound velocity and the pulseIn() function to build a parking sensor.'
      }
    ],
    quiz: {
      id: 'quiz2',
      questions: [
        {
          id: 'q2-1',
          question: 'Which pin on HC-SR04 ultrasonic sensor is responsible for sending out the ultrasonic sound wave?',
          options: ['VCC', 'GND', 'Trigger', 'Echo'],
          correctAnswer: 2
        },
        {
          id: 'q2-2',
          question: 'What function is used to read an analog value from an analog input pin?',
          options: ['analogRead()', 'analogIn()', 'readAnalog()', 'digitalRead()'],
          correctAnswer: 0
        },
        {
          id: 'q2-3',
          question: 'As light intensity increases on an LDR, its electrical resistance:',
          options: ['Increases', 'Decreases', 'Remains unchanged', 'Fluctuates randomly'],
          correctAnswer: 1
        }
      ]
    },
    assignment: {
      id: 'assign2',
      title: 'Assignment 2: Smart Anti-Collision System',
      description: 'Build a system using an Ultrasonic sensor and a Buzzer. If an obstacle is closer than 15cm, beep the buzzer rapidly.',
      problemStatement: 'Problem Statement: Read distance using HC-SR04. If distance < 15cm, turn a Buzzer ON. If distance is between 15cm and 30cm, blink the buzzer periodically. If distance > 30cm, turn the buzzer OFF. Submit your tinkercad circuit design link or C++ code.'
    }
  },
  {
    id: 'mod3',
    title: 'Module 3: Controlling Motors and Actuators',
    description: 'Learn how to control movement in robotics using Servo motors and high-current DC motors.',
    lessons: [
      {
        id: 'm3-l1',
        title: 'Class 3.1: Precision Angled Control with Servo Motor',
        duration: '18 mins',
        videoUrl: 'https://www.youtube.com/embed/5b94uR77XmQ',
        pdfUrl: 'https://www.arduino.cc/reference/en/libraries/servo/',
        description: 'Understand the difference between continuous rotation and 180-degree servos. Control servo angles using the built-in Servo.h library.'
      },
      {
        id: 'm3-l2',
        title: 'Class 3.2: DC Motor Basics & L298N Motor Driver',
        duration: '22 mins',
        videoUrl: 'https://www.youtube.com/embed/dyjo_ggOnVU',
        pdfUrl: 'https://docs.arduino.cc/learn/electronics/motors',
        description: 'Why do we need a motor driver? Master the L298N H-Bridge dual motor driver to control the speed and direction of DC motors.'
      }
    ],
    quiz: {
      id: 'quiz3',
      questions: [
        {
          id: 'q3-1',
          question: 'Why can we not run high-power DC motors directly from Arduino Uno\'s 5V output pin?',
          options: ['Arduino provides too much voltage', 'Arduino cannot supply enough current, risking board burn-out', 'DC motors require AC current', 'Arduino pins are only compatible with Bluetooth'],
          correctAnswer: 1
        },
        {
          id: 'q3-2',
          question: 'Which method in the Servo library is used to turn a servo motor to a specific angle?',
          options: ['servo.angle()', 'servo.write()', 'servo.move()', 'servo.rotate()'],
          correctAnswer: 1
        },
        {
          id: 'q3-3',
          question: 'What is the purpose of an H-Bridge in motor drivers?',
          options: ['To increase motor voltage', 'To measure motor speed', 'To reverse polarity and thus change motor rotation direction', 'To protect the motor from magnetic fields'],
          correctAnswer: 2
        }
      ]
    },
    assignment: {
      id: 'assign3',
      title: 'Assignment 3: Automatic Barrier Gate',
      description: 'Simulate a smart barrier gate. When an obstacle/car is detected close to the gate, open the servo gate 90 degrees.',
      problemStatement: 'Problem Statement: Combine HC-SR04 ultrasonic sensor and SG90 Servo motor. When distance < 10cm, turn the servo motor to 90 degrees (open). Hold for 3 seconds. When no obstacle is closer than 10cm, rotate the servo back to 0 degrees (closed). Submit code or Tinkercad link.'
    }
  },
  {
    id: 'mod4',
    title: 'Module 4: Robotics Project: Building an Obstacle Avoiding Robot',
    description: 'Assemble all your knowledge to construct a fully autonomous obstacle-avoiding mobile robot chassis.',
    lessons: [
      {
        id: 'm4-l1',
        title: 'Class 4.1: Robot Chassis Assembly & Wiring',
        duration: '25 mins',
        videoUrl: 'https://www.youtube.com/embed/4Gf_CshK7i4',
        pdfUrl: 'https://docs.arduino.cc/learn/microcontrollers/arduino-uno',
        description: 'Learn the step-by-step mechanical assembly of a 2-wheel/4-wheel drive robot chassis and wire the batteries, driver, and sensors.'
      },
      {
        id: 'm4-l2',
        title: 'Class 4.2: Writing the Autonomous Navigation Algorithm',
        duration: '30 mins',
        videoUrl: 'https://www.youtube.com/embed/4yP8N-66Eeg',
        pdfUrl: 'https://github.com/arduino/Arduino',
        description: 'Program the robot to move forward, scan with its ultrasonic sensor on a servo radar, detect obstacles, stop, make turn decisions, and resume.'
      }
    ],
    quiz: {
      id: 'quiz4',
      questions: [
        {
          id: 'q4-1',
          question: 'Which component is best suited to turn the ultrasonic sensor left and right to scan the environment in an obstacle avoider robot?',
          options: ['DC Motor', 'Stepper Motor', 'Servo Motor', 'Solenoid'],
          correctAnswer: 2
        },
        {
          id: 'q4-2',
          question: 'In a typical L298N motor driver connection, what pin controls the speed of Motor A?',
          options: ['IN1', 'IN2', 'ENA (Enable A)', 'GND'],
          correctAnswer: 2
        }
      ]
    },
    assignment: {
      id: 'assign4',
      title: 'Assignment 4: Remote Control or Smart Robot Code',
      description: 'Write the complete code structure for an obstacle avoiding robot, including forward, backward, left, right, and stop functions.',
      problemStatement: 'Problem Statement: Write modular C++ code declaring pin numbers for L298N driver and HC-SR04 sensor. Implement clear helper functions `moveForward()`, `moveBackward()`, `turnLeft()`, `turnRight()`, and `stopMoving()`. Use these functions inside the loop to navigate autonomously. Submit your source C++ file (.ino or plain text).'
    }
  },
  {
    id: 'mod5',
    title: 'Module 5: Introduction to IoT & Wireless Control',
    description: 'Integrate Bluetooth and Blynk/ESP8266 to control your Arduino projects wirelessly using your smartphone.',
    lessons: [
      {
        id: 'm5-l1',
        title: 'Class 5.1: Bluetooth Controlled Robot using HC-05',
        duration: '22 mins',
        videoUrl: 'https://www.youtube.com/embed/ZgH79fI-W_0',
        pdfUrl: 'https://docs.arduino.cc/built-in-examples/communication/SoftwareSerial',
        description: 'Interfacing HC-05 Bluetooth module with Arduino Uno using SoftwareSerial. Read serial characters sent from an Android App to drive motors.'
      },
      {
        id: 'm5-l2',
        title: 'Class 5.2: IoT Home Automation with Blynk & ESP8266',
        duration: '28 mins',
        videoUrl: 'https://www.youtube.com/embed/PjcoY_VIsgU',
        pdfUrl: 'https://docs.blynk.io/en/',
        description: 'Brief overview of Wi-Fi microcontrollers (ESP8266 / NodeMCU). Learn how to switch AC/DC home appliances via a 5V Relay module using the Blynk cloud application.'
      }
    ],
    quiz: {
      id: 'quiz5',
      questions: [
        {
          id: 'q5-1',
          question: 'Which library is commonly used to create virtual serial ports on other digital pins of the Arduino Uno?',
          options: ['SPI.h', 'Wire.h', 'SoftwareSerial.h', 'EEPROM.h'],
          correctAnswer: 2
        },
        {
          id: 'q5-2',
          question: 'What is the standard default baud rate of most HC-05 Bluetooth modules in normal operation?',
          options: ['4800', '9600', '115200', '57600'],
          correctAnswer: 1
        }
      ]
    },
    assignment: {
      id: 'assign5',
      title: 'Assignment 5: Capstone IoT Arduino Project Idea',
      description: 'Submit a proposal for a smart robotics or IoT project that you want to build on real hardware using the Arduino platform.',
      problemStatement: 'Problem Statement: Write a 1-page proposal containing: (1) Project Title, (2) List of hardware components needed, (3) Block diagram/working logic, and (4) Real-world problem solved by this project. Upload your proposal in PDF format or text.'
    }
  }
];
