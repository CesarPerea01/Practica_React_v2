/* eslint-disable react/react-in-jsx-scope */
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constant'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons.tsx'
import { LanguageSelector } from './components/LanguageSelector.tsx'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea.tsx'
import { useEffect } from 'react'
import { translate } from './services/translate.ts'
import { useDebounce } from './hooks/useDebounce.ts'


function App() {
  const {loading, fromLanguage, toLanguage, fromText, result, setFromLanguage, interchangeLanguages, setToLanguage, setFromText, setResult} = useStore()
  
  const handleClipboard = ()=>{
    navigator.clipboard.writeText(result).catch(()=>{})
  }
  

  const handleSpeak = ()=>{
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    speechSynthesis.speak(utterance)
  }


  const debouncedFromText = useDebounce(fromText, 250)
  useEffect(()=>{
    if (debouncedFromText == '') return

    translate({fromLanguage, toLanguage, text: debouncedFromText})
    .then(result=>{
      if (result==null) return
      setResult(result)
    })
    .catch(()=> setResult('Error'))
  },[debouncedFromText])

  return (
    <Container fluid>
      <h1>Google Translate</h1>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}/>
              <TextArea
                value={fromText}
                type = {SectionType.From}
                onChange={setFromText}
              />
          </Stack>
        </Col>

        <Col xs='auto'>
          <Button variant='link' disabled={fromLanguage == AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowsIcon/>
          </Button>
        </Col>

        <Col>
          <Stack>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
              <div style={{position: 'relative'}} >
                <TextArea
                  value = {result}
                  type = {SectionType.To}
                  loading={loading}
                  onChange={setResult}
                />
                <div style={{position:'absolute', left:0, bottom:0, display:'flex'}}>
                  <Button variant='link' 
                    onClick={handleClipboard}>
                      <ClipboardIcon/>
                  </Button>
                  <Button variant='link'
                    onClick={handleSpeak}>
                      <SpeakerIcon/>
                  </Button>
                  </div >
              </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
