import { useEffect, useRef, useState } from 'react'
import './App.css'

const FORM_ACTION = 'https://app.feedblitz.com/f/f.fbz?Join'
const FEEDBLITZ_SCRIPT = 'https://app.feedblitz.com/f/?p13n=501894'

function SubscribeForm() {
  const formRef = useRef(null)
  const waitImageRef = useRef(null)
  const [email, setEmail] = useState('')
  const [dailyUpdates, setDailyUpdates] = useState(true)
  const [weeklyUpdates, setWeeklyUpdates] = useState(false)
  const [consent, setConsent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [invalidMessage, setInvalidMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    window.F3702_sb_requiredFields = [
      'F3702_sb_email',
      'F3702_sb_feedid',
      'F3702_sb_GdprCheck',
      'F3702_sb_publisherid',
      'F3702_sb_cids',
    ]
    window.F3702_sb_validateFields = []
    window.F3702_sb_fieldcol = '#000000'

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = FEEDBLITZ_SCRIPT
    script.async = true
    document.body.appendChild(script)

    let logged = false
    const wait = window.setInterval(() => {
      try {
        if (logged) {
          return
        }

        if (
          typeof window.fbz_SmartForm === 'function' &&
          typeof window.feedblitz_full_form !== 'undefined' &&
          typeof window.fbz_FitForm === 'function'
        ) {
          window.fbz_SmartForm('F3702_sb', window.feedblitz_full_form)

          try {
            if (typeof window.s === 'function') {
              window.s('F3702_sb')
            }
          } catch {
            // The original embed ignores FeedBlitz personalization errors.
          }

          window.fbz_FitForm('F3702_sb')

          if (
            waitImageRef.current &&
            typeof window.fbz_formMetrics === 'function'
          ) {
            waitImageRef.current.innerHTML = window.fbz_formMetrics(3702, 1)
          }

          logged = true
          window.clearInterval(wait)
        }
      } catch {
        // Match the original script behavior: keep the form usable if FeedBlitz helpers fail.
      }
    }, 100)

    return () => {
      window.clearInterval(wait)
      script.remove()
    }
  }, [])

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const submitForm = () => {
    const trimmedEmail = email.trim()
    const hasSelectedList = dailyUpdates || weeklyUpdates

    setErrorMessage('')
    setInvalidMessage('')

    if (!trimmedEmail || !hasSelectedList || !consent) {
      setErrorMessage('Please enter all required fields')
      return
    }

    if (!isValidEmail(trimmedEmail)) {
      setInvalidMessage('Correct invalid entries')
      return
    }

    if (!formRef.current) {
      return
    }

    setIsSubmitting(true)

    if (typeof window.smartFormSubmit === 'function') {
      window.smartFormSubmit(formRef.current.fbzsubscribe)
      return
    }

    formRef.current.submit()
  }

  return (
    <div
      id="F3702_sb_container"
      align="center"
      className="F3702_sb_fbz_page"
      style={{ padding: '0.5em', clear: 'both ' }}
    >
      <form
        ref={formRef}
        method="POST"
        name="F3702"
        id="F3702_sb"
        style={{ display: 'block', margin: 'auto', maxWidth: '600px' }}
        action={FORM_ACTION}
      >
        <div name="F3702__hh" style={{ display: 'none' }}>
          <input
            style={{ display: 'none' }}
            type="email"
            name="email_"
            value=""
            readOnly
          />
          <input
            style={{ display: 'none' }}
            type="email"
            name="email_address"
            value=""
            readOnly
          />
          <input
            style={{ display: 'none' }}
            type="email"
            name="_email"
            value=""
            readOnly
          />
          <input type="hidden" name="subcf" value="1" />
          <input type="hidden" name="formid" value="F3702" />
        </div>

        <table
          cellPadding="0"
          cellSpacing="0"
          border="0"
          className="F3702_sb_fbz_table"
          style={{ tableLayout: 'fixed', maxWidth: '100%', width: '100%' }}
        >
          <tbody>
            <tr>
              <td className="F3702_sb_fbz_form">
                <table
                  border="0"
                  cellPadding="6"
                  cellSpacing="0"
                  align="center"
                  width="100%"
                  className="F3702_sb_fbz_table"
                  style={{ borderRadius: '20px' }}
                >
                  <tbody>
                    <tr className="F3702_sb_fbz_row">
                      <td
                        className="F3702_sb_fbz_label"
                        style={{ paddingTop: '0.7em', padding: '0' }}
                      ></td>
                      <td
                        style={{
                          paddingLeft: '0.5em',
                          paddingRight: '0.5em',
                          width: '100%',
                        }}
                      >
                        <div
                          className="F3702_sb_fbz_text"
                          style={{
                            marginBottom: '0.3em',
                            textAlign: 'center',
                          }}
                        >
                          Your email address:
                          <b style={{ color: 'red' }} title="Required">
                            *
                          </b>
                        </div>
                        <div
                          className="F3702_sb_fbz_input_container"
                          style={{
                            backgroundImage: 'none',
                            paddingRight: '0',
                          }}
                        >
                          <input
                            className="F3702_sb_fbz_input"
                            type="text"
                            name="email"
                            id="F3702_sb_email"
                            value={email}
                            alt="Your email address:"
                            title="Your email address:"
                            placeholder="Your email address:"
                            onClick={() => {
                              setErrorMessage('')
                              setInvalidMessage('')
                            }}
                            onFocus={() => {
                              setErrorMessage('')
                              setInvalidMessage('')
                            }}
                            onBlur={() => setEmail((value) => value.trim())}
                            onChange={(event) => setEmail(event.target.value)}
                            width="100%"
                            style={{ width: '100%', paddingRight: '0' }}
                            data-fbz-val="validateEmail"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="F3702_sb_fbz_row">
                      <td
                        className="F3702_sb_fbz_label"
                        style={{ padding: '0' }}
                      ></td>
                      <td
                        style={{
                          paddingLeft: '0.5em',
                          paddingRight: '0.5em',
                          width: '100%',
                        }}
                      >
                        <div
                          className="F3702_sb_fbz_text"
                          style={{
                            marginBottom: '0.3em',
                            textAlign: 'center',
                          }}
                        >
                          Subscribe to:
                          <b style={{ color: 'red' }} title="Required">
                            *
                          </b>
                        </div>
                        <div className="F3702_sb_fbz_input">
                          <label>
                            <input
                              className="F3702_sb_fbz_input"
                              type="checkbox"
                              name="feedid"
                              id="F3702_sb_feedid"
                              checked={dailyUpdates}
                              onChange={(event) =>
                                setDailyUpdates(event.target.checked)
                              }
                              style={{ width: 'auto' }}
                              value="501894"
                              alt="Choose the list you want to join"
                              title="Choose the list you want to join"
                            />
                            <span
                              className="F3702_sb_fbz_fieldlabeltext"
                              style={{ paddingTop: '0', paddingBottom: '0' }}
                            >
                              Chris Skinner&apos;s Blog - Daily Updates
                            </span>
                          </label>
                          <br />
                          <label>
                            <input
                              className="F3702_sb_fbz_input"
                              type="checkbox"
                              name="feedid"
                              id="F3702_sb_feedid_1"
                              checked={weeklyUpdates}
                              onChange={(event) =>
                                setWeeklyUpdates(event.target.checked)
                              }
                              style={{ width: 'auto' }}
                              value="1122370"
                              alt="Choose the list you want to join"
                              title="Choose the list you want to join"
                            />
                            <span
                              className="F3702_sb_fbz_fieldlabeltext"
                              style={{ paddingTop: '0', paddingBottom: '0' }}
                            >
                              Chris Skinner&apos;s Blog - Weekly Updates
                            </span>
                          </label>
                        </div>
                      </td>
                    </tr>

                    <tr className="F3702_sb_fbz_row">
                      <td
                        className="F3702_sb_fbz_label"
                        style={{ padding: '0' }}
                      ></td>
                      <td
                        style={{
                          paddingLeft: '0.5em',
                          paddingRight: '0.5em',
                          width: '100%',
                        }}
                      >
                        <div
                          className="F3702_sb_fbz_text"
                          style={{
                            marginBottom: '0.3em',
                            textAlign: 'center',
                          }}
                        >
                          Consent
                          <b style={{ color: 'red' }} title="Required">
                            *
                          </b>
                        </div>
                        <div className="F3702_sb_fbz_input">
                          <label>
                            <input
                              className="F3702_sb_fbz_input"
                              type="checkbox"
                              name="GdprCheck"
                              id="F3702_sb_GdprCheck"
                              checked={consent}
                              onChange={(event) =>
                                setConsent(event.target.checked)
                              }
                              style={{ width: 'auto' }}
                              value="accepted"
                              alt="We need your consent to email you about this. You will still need to confirm after you submit the form (a process called dual opt-in)"
                              title="We need your consent to email you about this. You will still need to confirm after you submit the form (a process called dual opt-in)"
                            />
                            <span
                              className="F3702_sb_fbz_fieldlabeltext"
                              style={{ paddingTop: '0', paddingBottom: '0' }}
                            >
                              Yes, I consent to being emailed
                            </span>
                          </label>
                        </div>
                      </td>
                    </tr>

                    <tr className="F3702_sb_fbz_row_nohover F3702_sb_fbz_smartform">
                      <td className="F3702_sb_fbz_fieldtext" colSpan="2">
                        <div style={{ textAlign: 'center' }}>
                          <input
                            className="F3702_sb_fbz_button"
                            type="button"
                            onClick={submitForm}
                            name="fbzsubscribe"
                            id="F3702_sb_subscribe"
                            value="Get Email Updates"
                            alt="click to join"
                            title="click to join"
                            width="100%"
                            disabled={isSubmitting}
                            style={{
                              fontSize: '100%',
                              height: 'inherit',
                              fontFamily: 'Tahoma, Geneva, sans-serif',
                              backgroundColor: '#8c1c24',
                              color: '#ffffff',
                              whiteSpace: 'normal',
                              width: '100%',
                              marginLeft: '0',
                              marginRight: '0',
                              paddingLeft: '0',
                              paddingRight: '0',
                            }}
                          />
                          <img
                            id="F3702_sb_fbz_wait"
                            alt="Please wait..."
                            style={{
                              display: isSubmitting ? 'inline-block' : 'none',
                              width: '48px',
                              opacity: '0.5',
                            }}
                            src="https://assets.feedblitz.com/images/spinner.gif"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr style={{ display: 'none' }}>
                      <td colSpan="2">
                        <input
                          type="hidden"
                          name="publisherid"
                          id="F3702_sb_publisherid"
                          value="49830596"
                        />
                        <input
                          type="hidden"
                          name="cids"
                          id="F3702_sb_cids"
                          value="1"
                        />
                      </td>
                    </tr>

                    <tr className="F3702_sb_fbz_row_nohover">
                      <td colSpan="2" style={{ padding: '0', border: '0' }}>
                        <div
                          id="F3702_sb_fbz_err"
                          className="F3702_sb_fbz_err"
                          style={{
                            position: 'relative',
                            display: errorMessage ? 'block' : 'none',
                          }}
                        >
                          {errorMessage}
                          <img
                            onClick={() => setErrorMessage('')}
                            border="0"
                            alt="Click to hide"
                            align="baseline"
                            width="8"
                            height="8"
                            style={{
                              float: 'right',
                              align: 'baseline',
                              width: '8px',
                              height: '8px',
                              opacity: '0.5',
                              cursor: 'pointer',
                              position: 'absolute',
                              top: '4px',
                              right: '4px',
                            }}
                            src="https://assets.feedblitz.com/images/close.gif"
                          />
                        </div>
                        <div
                          id="F3702_sb_fbz_invalid"
                          className="F3702_sb_fbz_invalid"
                          style={{
                            position: 'relative',
                            display: invalidMessage ? 'block' : 'none',
                          }}
                        >
                          {invalidMessage}
                          <img
                            onClick={() => setInvalidMessage('')}
                            border="0"
                            alt="Click to hide"
                            align="baseline"
                            width="8"
                            height="8"
                            style={{
                              float: 'right',
                              align: 'baseline',
                              width: '8px',
                              height: '8px',
                              opacity: '0.5',
                              cursor: 'pointer',
                              position: 'absolute',
                              top: '4px',
                              right: '4px',
                            }}
                            src="https://assets.feedblitz.com/images/close.gif"
                          />
                        </div>
                        <div
                          id="F3702_sb_fbz_status"
                          className="F3702_sb_fbz_err"
                        ></div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table
                  cellPadding="0"
                  cellSpacing="0"
                  border="0"
                  width="100%"
                  className="F3702_sb_fbz_table"
                >
                  <tbody>
                    <tr>
                      <td
                        className="F3702_sb_fbz_footer"
                        style={{
                          borderRadius: '0 0 20px 20px',
                          padding: '0.5em',
                        }}
                      >
                        <a
                          rel="nofollow"
                          className="F3702_sb_fbz_footer"
                          style={{
                            padding: '0',
                            background: 'none',
                            color: 'red',
                          }}
                          href="https://www.feedblitz.com/"
                        >
                          Powered by FeedBlitz
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <div
        id="F3702_sb_wait_img"
        ref={waitImageRef}
        style={{
          width: '0',
          height: '0',
          overflow: 'hidden',
          lineHeight: '0',
          display: 'inline-block',
          position: 'fixed',
        }}
      ></div>
    </div>
  )
}

function App() {
  return <SubscribeForm />
}

export default App
