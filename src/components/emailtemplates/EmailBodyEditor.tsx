import { useState } from "react";

const EmailBodyEditor = ({ templateName, envelopeSender, subject }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [htmlContent, setHtmlContent] = useState(`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                                Welcome to Our Platform!
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 24px;">
                                Hello There! 👋
                            </h2>
                            
                            <p style="color: #666666; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                                Thank you for joining our community. We're excited to have you on board and can't wait for you to explore all the amazing features we have prepared for you.
                            </p>
                            
                            <!-- Feature Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 6px; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="color: #333333; margin: 0 0 10px 0; font-size: 18px;">
                                            🚀 What's Next?
                                        </h3>
                                        <ul style="color: #666666; margin: 0; padding-left: 20px; line-height: 1.8;">
                                            <li>Complete your profile setup</li>
                                            <li>Explore our dashboard</li>
                                            <li>Connect with other users</li>
                                            <li>Start your first project</li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="#" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 6px; font-weight: bold; font-size: 16px; box-shadow: 0 3px 6px rgba(0,0,0,0.1);">
                                            Get Started Now
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="color: #666666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
                                If you have any questions, our support team is here to help. Just reply to this email or visit our help center.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e9ecef;">
                            <p style="color: #999999; margin: 0; font-size: 12px; line-height: 1.4;">
                                © 2025 Your Company Name. All rights reserved.<br>
                                123 Business Street, City, State 12345<br>
                                <a href="#" style="color: #667eea; text-decoration: none;">Unsubscribe</a> | 
                                <a href="#" style="color: #667eea; text-decoration: none;">Privacy Policy</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`);

  const tabs = ["HTML Editor", "Live Preview"];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 mb-0">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all ${
              activeTab === index
                ? "bg-white text-blue-600 shadow dark:bg-gray-700 dark:text-blue-400"
                : "text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl min-h-[500px]">
        {activeTab === 0 ? (
          // HTML Editor Tab
          <div className="p-4 h-full">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Edit HTML Email Template:
              </label>
              <textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                className="w-full h-96 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan HTML content di sini..."
              />
            </div>
            
            {/* Quick Insert Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setHtmlContent(prev => prev + '\n<p style="color: #666; margin: 10px 0;">New paragraph</p>')}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                + Paragraph
              </button>
              <button
                onClick={() => setHtmlContent(prev => prev + '\n<h2 style="color: #333; margin: 15px 0;">New Heading</h2>')}
                className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
              >
                + Heading
              </button>
              <button
                onClick={() => setHtmlContent(prev => prev + '\n<a href="#" style="color: #667eea; text-decoration: none;">Link Text</a>')}
                className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
              >
                + Link
              </button>
              <button
                onClick={() => setHtmlContent(prev => prev + '\n<div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">Box Content</div>')}
                className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
              >
                + Box
              </button>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              <strong>Tips:</strong>
              <ul className="mt-1 space-y-1 list-disc list-inside">
                <li>Use a table-based layout for email client compatibility.</li>
                <li>Always use inline CSS for styling</li>
                <li>Test on various email clients (Gmail, Outlook, etc.)</li>
                <li>Use width in pixels for the main table (max 600px)</li>
              </ul>
            </div>
          </div>
        ) : (
          // Live Preview Tab
          <div className="p-4 h-full">
            {/* Email Header Info */}
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>📧 Email Preview</strong>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                <div><strong>From:</strong> {envelopeSender || "your-team@company.com"}</div>
                <div><strong>Subject:</strong> {subject || "Welcome to Our Platform!"}</div>
                <div><strong>Template:</strong> {templateName || "Welcome Email"}</div>
              </div>
            </div>
            
            {/* Live Preview */}
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white min-h-[400px] overflow-auto">
              {htmlContent ? (
                <iframe
                  srcDoc={htmlContent}
                  className="w-full h-96 border-none"
                  title="Email Preview"
                  sandbox="allow-same-origin"
                />
              ) : (
                <div className="p-8 text-gray-400 text-center">
                  <div className="text-4xl mb-4">📧</div>
                  <div>Preview akan muncul di sini setelah Anda menambahkan HTML content...</div>
                </div>
              )}
            </div>
            
            {/* Preview Notes */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  <strong>✅ Desktop Preview</strong><br/>
                  The current view shows how the email will look in desktop clients such as Outlook and Thunderbird.
                </div>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-xs text-orange-700 dark:text-orange-300">
                  <strong>⚠️ Mobile Compatibility</strong><br/>
                  Be sure to use responsive design with media queries for optimal mobile viewing.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailBodyEditor;
