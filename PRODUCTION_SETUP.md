# Production Setup Guide

## SMTP Email Configuration

The contact form requires SMTP credentials to send emails in production. Follow these steps to configure email functionality.

### Required Environment Variables

Set these variables in your Vercel dashboard (Settings → Environment Variables):

```bash
# SMTP Server Configuration
SMTP_HOST=your-smtp-host.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password

# Email Recipients
COMPANY_EMAIL=officemgr@iismet.com
```

### Recommended SMTP Providers

#### Option 1: Gmail SMTP (Free for low volume)
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
```

**Setup Steps:**
1. Enable 2-factor authentication on your Gmail account
2. Generate an App-Specific Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the generated 16-character password
3. Use this password in `SMTP_PASS`

**Limits:** 500 emails per day for free Gmail accounts

#### Option 2: SendGrid (Recommended for production)
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

**Setup Steps:**
1. Sign up at https://sendgrid.com/
2. Create an API key with "Mail Send" permissions
3. Use `apikey` as username (literally the word "apikey")
4. Use your API key as the password

**Limits:** 100 emails per day on free tier

#### Option 3: AWS SES (Best for high volume)
```bash
SMTP_HOST=email-smtp.us-west-2.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-aws-smtp-username
SMTP_PASS=your-aws-smtp-password
```

**Setup Steps:**
1. Go to AWS SES Console
2. Verify your sending domain
3. Create SMTP credentials
4. Note the SMTP endpoint for your region

**Limits:** Very high, pay-per-use after free tier

### Setting Environment Variables in Vercel

1. Go to your project in Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable one by one:
   - **Key:** Variable name (e.g., `SMTP_HOST`)
   - **Value:** Your credential
   - **Environment:** Select "Production" (and optionally "Preview" and "Development")
4. Click **Save**
5. Redeploy your application for changes to take effect

### Testing Email Functionality

After configuration, test the contact form:

1. Visit https://precision-manufacturing.vercel.app/contact
2. Fill out and submit the contact form
3. You should receive:
   - A notification email at `COMPANY_EMAIL`
   - A confirmation email sent to the submitter
4. Check spam folders if emails don't appear

### Current Status

- **Form Validation:** ✅ Working (Zod schemas)
- **Server Actions:** ✅ Working (app/(site)/contact/actions.ts)
- **Email Templates:** ✅ Ready (Professional HTML templates)
- **SMTP Configuration:** ⚠️ Needs production credentials

The contact form is fully functional and will work as soon as SMTP credentials are configured in Vercel.

### Troubleshooting

**Error: "Connection timeout"**
- Check `SMTP_HOST` and `SMTP_PORT` are correct
- Verify firewall/network allows SMTP connections

**Error: "Authentication failed"**
- Verify `SMTP_USER` and `SMTP_PASS` are correct
- For Gmail, ensure you're using App-Specific Password, not account password

**Error: "Sender address rejected"**
- Some SMTP providers require domain verification
- Check your SMTP provider's sender requirements

**Emails go to spam**
- Configure SPF, DKIM, and DMARC records for your domain
- Use a verified sending domain with your SMTP provider

### Security Notes

- Never commit SMTP credentials to the repository
- Use environment variables for all sensitive data
- Rotate credentials if they're ever exposed
- Consider using IP restrictions on your SMTP provider

### Additional Configuration

All environment variables are already read from `process.env` in `lib/email.ts:9-14`.

No code changes are needed - just set the environment variables in Vercel and the system will work automatically.
