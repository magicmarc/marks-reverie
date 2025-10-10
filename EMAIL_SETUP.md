# Email Setup Guide for Writing Challenge

This guide will help you configure email notifications for the Writing Challenge submission form.

## Quick Setup (Gmail - Recommended)

### 1. Enable 2-Factor Authentication on Gmail
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Follow the setup wizard to enable 2FA

### 2. Generate App Password
1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Select **App**: Mail
3. Select **Device**: Other (Custom name) → "Mark's Reverie"
4. Click **Generate**
5. Copy the 16-character password (save it securely!)

### 3. Configure Environment Variables
Create a `.env.local` file in your project root:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # The app password from step 2
EMAIL_FROM=your.email@gmail.com
EMAIL_TO=markmagicwang@gmail.com
```

**Important**: 
- Use the **app password**, NOT your regular Gmail password
- Replace `your.email@gmail.com` with your actual Gmail address
- The spaces in the app password are optional

### 4. Test the Setup
1. Start your development server: `pnpm run dev`
2. Go to `http://localhost:3000/writing-challenge`
3. Fill out the form and submit
4. Check your email inbox (markmagicwang@gmail.com)

## Alternative Email Providers

### Using Other SMTP Services

#### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your.email@outlook.com
EMAIL_PASSWORD=your_password
EMAIL_FROM=your.email@outlook.com
EMAIL_TO=markmagicwang@gmail.com
```

#### Yahoo Mail
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your.email@yahoo.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=your.email@yahoo.com
EMAIL_TO=markmagicwang@gmail.com
```

#### Custom SMTP Server
```env
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASSWORD=your_password
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=markmagicwang@gmail.com
```

## Troubleshooting

### "Invalid login" error
- Make sure you're using an **app password**, not your regular password
- Verify 2FA is enabled on your Google account
- Check that EMAIL_USER matches the account that generated the app password

### "Connection timeout" error
- Check your internet connection
- Verify EMAIL_HOST and EMAIL_PORT are correct
- Try port 465 with `secure: true` if port 587 doesn't work

### Email not received
- Check spam/junk folder
- Verify EMAIL_TO address is correct
- Check server logs for any error messages

### Rate limiting
- Gmail allows ~500 emails per day for free accounts
- Consider using SendGrid or AWS SES for high-volume submissions

## Security Best Practices

1. **Never commit `.env.local` to git** (it's already in .gitignore)
2. **Use app passwords** instead of your main password
3. **Rotate passwords regularly**
4. **Use different credentials** for development and production
5. **Monitor email logs** for suspicious activity

## Production Deployment

### Vercel
1. Go to your project settings on Vercel
2. Navigate to **Environment Variables**
3. Add all EMAIL_* variables
4. Redeploy your application

### Netlify
1. Go to **Site settings** → **Environment variables**
2. Add all EMAIL_* variables
3. Trigger a new deploy

## Email Format

Submissions will arrive with:
- **Subject**: "New Writing Challenge Submission: [Work Title]"
- **Body**: Formatted HTML with all submission details
- **Attachment**: The submitted file

## Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Check server logs: `pnpm run dev`
3. Verify all environment variables are set correctly
4. Test SMTP connection using an online SMTP tester

---

**Note**: For high-volume or production use, consider professional email services like:
- [SendGrid](https://sendgrid.com/) - 100 emails/day free
- [AWS SES](https://aws.amazon.com/ses/) - 62,000 emails/month free (if hosted on AWS)
- [Resend](https://resend.com/) - 100 emails/day free

