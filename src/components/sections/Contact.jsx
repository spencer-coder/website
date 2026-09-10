import { useState } from 'react';
import { Section } from '../layout/Section.jsx';
import { Button } from '../ui/Button.jsx';
import { MailIcon, DocumentIcon, PhoneIcon } from '../ui/Icons.jsx';
import { profile } from '../../content/portfolio.js';

const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ name, email, message }) {
  const errors = {};
  if (!name.trim()) errors.name = 'Please tell me your name.';
  if (!email.trim()) errors.email = 'An email address is needed so I can reply.';
  else if (!EMAIL_PATTERN.test(email.trim()))
    errors.email = 'That does not look like an email address.';
  if (!message.trim()) errors.message = 'Please include a message.';
  else if (message.trim().length < 10) errors.message = 'A little more detail would help.';
  return errors;
}

export function Contact() {
  return (
    <Section id="contact" eyebrow="05 / Contact" title="Get in touch">
      <p className="text-ink-400 -mt-4 mb-8 max-w-2xl leading-relaxed">
        If you have a question, an opportunity, or something else feel free to contact me.
      </p>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,15rem)]">
        {ENDPOINT ? <ContactForm /> : <MailtoFallback />}
        <DirectLinks />
      </div>
    </Section>
  );
}

function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  function update(field) {
    return (event) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
          _subject: `Portfolio message from ${values.name}`,
        }),
      });

      if (!response.ok) throw new Error(`Form endpoint responded ${response.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="border-accent-500/30 bg-accent-500/5 rounded-2xl border p-6 text-center"
      >
        <p className="text-ink-100 font-semibold">Message sent.</p>
        <p className="text-ink-400 mt-2 text-sm leading-relaxed">
          Thanks for reaching out. I'll get back to you at {values.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Honeypot: bots fill every field they find, people never see this one. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="contact-gotcha">Leave this field empty</label>
        <input id="contact-gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field
        id="contact-name"
        label="Name"
        value={values.name}
        error={errors.name}
        onChange={update('name')}
        autoComplete="name"
      />

      <Field
        id="contact-email"
        label="Email"
        type="email"
        value={values.email}
        error={errors.email}
        onChange={update('email')}
        autoComplete="email"
      />

      <Field
        id="contact-message"
        label="Message"
        as="textarea"
        rows={5}
        value={values.message}
        error={errors.message}
        onChange={update('message')}
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </Button>

        {status === 'error' && (
          <p role="alert" className="text-sm text-rose-300">
            That didn't send. Please email me directly at{' '}
            <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
              {profile.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

function Field({ id, label, error, as = 'input', ...rest }) {
  const Element = as;
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <Element
        id={id}
        name={id.replace('contact-', '')}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`field ${error ? 'border-rose-500/60' : ''}`}
        {...rest}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}

// Shown when VITE_FORMSPREE_ENDPOINT is unset: a form with nowhere to post
// would look identical to a working one and swallow every message.
function MailtoFallback() {
  return (
    <div className="border-ink-700/60 bg-ink-900/50 rounded-2xl border p-6">
      <h3 className="text-base">Email me directly</h3>
      <p className="text-ink-400 mt-2 text-sm leading-relaxed">
        The quickest way to reach me is straight to my inbox.
      </p>
      <Button href={`mailto:${profile.email}`} className="mt-5">
        <MailIcon />
        {profile.email}
      </Button>
    </div>
  );
}

function DirectLinks() {
  return (
    <div className="space-y-3">
      <Button href={profile.cv} variant="secondary" className="w-full" download>
        <DocumentIcon />
        Download CV
      </Button>

      {profile.phone && (
        <Button href={`tel:${profile.phone}`} variant="secondary" className="w-full">
          <PhoneIcon />
          {profile.phone}
        </Button>
      )}

      <p className="text-ink-400 pt-1 text-center font-mono text-xs break-all">{profile.email}</p>
    </div>
  );
}
