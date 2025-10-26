# LMS Platform Pages & Routes Checklist

## Created Pages & Routes

- [x] **Landing Page**

  - Route: `/`
  - Features: Hero, waitlist signup, selling points, testimonials

- [x] **Waitlist Form Component**

  - Integrated on landing page and reused elsewhere
  - Collects full name and email with validation

- [x] **Course Listing Page**

  - Route: `/courses`
  - Features: Static hero, search/filter, sorting, pagination, course cards

- [x] **Course Management (Admin)**

  - Route: `/admin/courses`
  - Features: View/create/edit courses and lessons, file uploads (thumbnail, lesson files)

- [x] **Admin Layout**

  - Sidebar, header, footer wrapping admin pages for consistent UI

- [x] **404 Not Found Page**
  - Route: For unmatched URLs
  - Features: Friendly, branded error message with call-to-action

---

## Yet To Create Pages & Routes

- [x] **Course Details Page**

  - Route: `/courses/:courseId`
  - Features: Full course info, syllabus, enrollment CTA, reviews

- [x] **User Authentication**

  - Routes: `/login`, `/signup`
  - Features: User registration and login forms

- [ ] **User Profile & Dashboard**

  - Route: `/profile` or `/dashboard`
  - Features: Learner progress, enrolled courses, certificates

- [ ] **Enrollment Tracking (Admin)**

  - Route: `/admin/enrollments`
  - Features: Track users’ course progress, certificate management

- [ ] **Payment & Subscription Management**

  - Routes: `/billing`, `/subscriptions`
  - Features: Manage payments, subscriptions, and billing info

- [ ] **Site Settings (Admin)**

  - Route: `/admin/settings`
  - Features: Platform configuration, email templates, notifications

- [ ] **Support & Communication**

  - Routes: `/support`, `/admin/support`
  - Features: User tickets, announcements, messaging

- [ ] **Reports & Analytics (Admin)**

  - Route: `/admin/reports`
  - Features: Course metrics, revenue data, export functionality

- [ ] **Additional Resources**
  - Optional pages like FAQs, tutorials, blog, or community forums
