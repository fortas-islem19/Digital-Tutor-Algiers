import { Faq, Footer, Gallery, Gifts, Groups, Header, Hero, Learn, Location, MobileBar, Program, Ticket, ToolsStrip, Trainer } from './components/Sections'
import RegisterForm from './components/RegisterForm'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Groups />
        <ToolsStrip />
        <Learn />
        <Program />
        <Gallery />
        <Trainer />
        <Gifts />
        <Ticket />
        <Location />
        <Faq />
        <RegisterForm />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
