/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import Overview from './components/Overview';
import CourseInfo from './components/CourseInfo';
import Curriculum from './components/Curriculum';
import Enrollment from './components/Enrollment';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-cyan-500 selection:text-white">
      <Hero />
      <Overview />
      <CourseInfo />
      <Curriculum />
      <Enrollment />
      <Footer />
    </div>
  );
}
