# Prismic Integration Setup & Repair Guide

## Summary of Repairs Made

### 1. **Fixed Environment Variable Naming** ✅

- **Before**: `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` (incorrect/non-standard)
- **After**: `NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME` (standard Prismic convention)
- **File**: [src/prismicio.ts](src/prismicio.ts)

### 2. **Added Access Token Support** ✅

- Added `PRISMIC_ACCESS_TOKEN` export for authenticated requests
- Required for preview mode and team access functionality
- Passed to Prismic client configuration
- **File**: [src/prismicio.ts](src/prismicio.ts)

### 3. **Secured Revalidation Webhook** ✅

- Added webhook token validation to prevent unauthorized cache revalidation
- Added error handling for better debugging
- **File**: [src/app/api/revalidate/route.ts](src/app/api/revalidate/route.ts)

### 4. **Created Environment Configuration Guide** ✅

- **File**: [.env.local.example](.env.local.example)
- Includes all required and optional environment variables
- Clear instructions on where to get each value

---

## Setup Instructions

### Step 1: Copy Environment Variables

```bash
# Copy the example file to create your local env file
cp .env.local.example .env.local
```

### Step 2: Get Your Prismic Access Token

1. Go to [Prismic Dashboard](https://prismic.io/)
2. Navigate to **Settings > API & Security**
3. Click on **"Permanent access tokens"**
4. Create a new token or copy an existing one
5. Paste it in `.env.local`:
   ```
   PRISMIC_ACCESS_TOKEN=your_token_here
   ```

### Step 3: Setup Webhook for Auto-Revalidation (Optional but Recommended)

1. Generate a secure webhook token (use a strong random string):
   ```bash
   # Example: openssl rand -base64 32
   ```
2. Add it to `.env.local`:
   ```
   PRISMIC_WEBHOOK_TOKEN=your_webhook_token_here
   ```
3. In Prismic Dashboard:
   - Go to **Integrations > Webhooks**
   - Click **"Add Webhook"**
   - **Trigger**: Select "A document is published/unpublished"
   - **URL**: `https://yourdomain.com/api/revalidate`
   - **Add custom header**:
     - Header name: `Authorization`
     - Header value: `Bearer your_webhook_token_here`
   - Save the webhook

### Step 4: Verify Configuration

```bash
# Run development server to test
npm run dev

# The preview route should be accessible at:
# http://localhost:3000/api/preview
```

---

## Current Configuration

### Repository Information

- **Repository Name**: `akshar-one`
- **Config File**: [slicemachine.config.json](slicemachine.config.json)

### Custom Types

The following custom types are configured:

- `page` → `/` or `/:uid`
- `property` → `/properties/:uid`
- `blog_post` → `/blogs/:uid`

### Environment Variables Reference

| Variable                              | Required          | Type   | Description                                |
| ------------------------------------- | ----------------- | ------ | ------------------------------------------ |
| `NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME` | No                | String | Repository name (defaults to "akshar-one") |
| `PRISMIC_ACCESS_TOKEN`                | Yes (for preview) | String | Access token for authenticated requests    |
| `PRISMIC_WEBHOOK_TOKEN`               | No                | String | Token for webhook signature validation     |

---

## Files Modified

1. **[src/prismicio.ts](src/prismicio.ts)**
   - Fixed environment variable naming
   - Added access token support
   - Improved comments and documentation

2. **[src/app/api/revalidate/route.ts](src/app/api/revalidate/route.ts)**
   - Added webhook token validation
   - Added error handling
   - Improved security

3. **[.env.local.example](.env.local.example)** (New)
   - Complete environment variable setup guide

---

## Testing the Integration

### Test Preview Mode

```bash
# 1. Start the dev server
npm run dev

# 2. Test preview URL
curl http://localhost:3000/api/preview
```

### Test Revalidation Webhook

```bash
# Simulate a webhook call with proper authentication
curl -X POST http://localhost:3000/api/revalidate \
  -H "Authorization: Bearer your_webhook_token_here"
```

---

## Troubleshooting

### Issue: Preview mode not working

- **Solution**: Ensure `PRISMIC_ACCESS_TOKEN` is set in `.env.local`
- Verify the token has appropriate permissions in Prismic Dashboard

### Issue: Revalidation webhook failing

- **Solution**: Verify `PRISMIC_WEBHOOK_TOKEN` matches webhook configuration
- Check webhook logs in Prismic Dashboard > Integrations > Webhooks

### Issue: TypeError about repositoryName

- **Solution**: Ensure `slicemachine.config.json` has valid `repositoryName` or set `NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME`

---

## Next Steps (Optional Enhancements)

1. **Implement Prismic Slices**: If using rich page layouts
   - Create slice components in [src/slices/](src/slices/)
   - Update [src/slices/index.ts](src/slices/index.ts)

2. **Fetch Content from Prismic**: Replace Supabase queries where desired
   - Use `createClient()` in your pages/components
   - Example patterns available in [Prismic Next.js docs](https://prismic.io/docs/technologies/next-js)

3. **Add Rich Text Rendering**: For Prismic rich text fields
   - Install: `npm install @prismicio/richtext`
   - Use `<SliceZone>` and components for rendering

---

## References

- [Prismic Documentation](https://prismic.io/docs/)
- [Prismic Next.js Integration](https://prismic.io/docs/technologies/next-js)
- [Slice Machine Setup](https://prismic.io/docs/technologies/slice-machine)
