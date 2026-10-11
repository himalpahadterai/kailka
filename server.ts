import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { db } from './server/db.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Public REST Endpoints

// 1. Settings & Branding
app.get('/api/settings', (req: Request, res: Response) => {
  res.json({ success: true, data: db.getSettings() });
});

app.put('/api/settings', (req: Request, res: Response) => {
  try {
    const actor = (req.headers['x-admin-user'] as string) || 'admin';
    const role = (req.headers['x-admin-role'] as string) || 'Super Admin';
    const updated = db.updateSettings(req.body, actor, role);
    res.json({ success: true, data: updated, message: "Settings updated successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Hero Slides
app.get('/api/hero', (req: Request, res: Response) => {
  res.json({ success: true, data: db.getHeroSlides() });
});

app.put('/api/hero', (req: Request, res: Response) => {
  try {
    const actor = (req.headers['x-admin-user'] as string) || 'admin';
    const role = (req.headers['x-admin-role'] as string) || 'Manager';
    const updated = db.updateHeroSlides(req.body.slides || [], actor, role);
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Menu Categories & Items
app.get('/api/menu', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      categories: db.getMenuCategories(),
      items: db.getMenuItems()
    }
  });
});

app.post('/api/menu/items', (req: Request, res: Response) => {
  try {
    const { categoryId, name, nepaliName, description, price, imageUrl, isVegetarian, isSpicy, isAvailable, tags } = req.body;
    if (!name || !price || !categoryId) {
      return res.status(400).json({ success: false, error: "Name, category, and price are required." });
    }
    const actor = (req.headers['x-admin-user'] as string) || 'admin';
    const role = (req.headers['x-admin-role'] as string) || 'Manager';
    const item = db.addMenuItem({
      categoryId,
      name,
      nepaliName: nepaliName || name,
      description: description || '',
      price: Number(price),
      imageUrl: imageUrl || '/images/dish_mithila_thali_1791710483088.jpg',
      isVegetarian: Boolean(isVegetarian),
      isSpicy: Boolean(isSpicy),
      isAvailable: isAvailable !== false,
      tags: tags || []
    }, actor, role);
    res.json({ success: true, data: item, message: "Menu item added successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/menu/items/:id', (req: Request, res: Response) => {
  try {
    const actor = (req.headers['x-admin-user'] as string) || 'admin';
    const role = (req.headers['x-admin-role'] as string) || 'Manager';
    const updated = db.updateMenuItem(req.params.id, req.body, actor, role);
    if (!updated) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }
    res.json({ success: true, data: updated, message: "Menu item updated successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/menu/items/:id', (req: Request, res: Response) => {
  try {
    const actor = (req.headers['x-admin-user'] as string) || 'admin';
    const role = (req.headers['x-admin-role'] as string) || 'Manager';
    const deleted = db.deleteMenuItem(req.params.id, actor, role);
    res.json({ success: deleted });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Festivals & Celebrations
app.get('/api/festivals', (req: Request, res: Response) => {
  res.json({ success: true, data: db.getFestivals() });
});

app.put('/api/festivals', (req: Request, res: Response) => {
  try {
    const actor = (req.headers['x-admin-user'] as string) || 'admin';
    const role = (req.headers['x-admin-role'] as string) || 'Manager';
    const updated = db.updateFestivals(req.body.festivals || [], actor, role);
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Explore Nearby Janakpur (Tourism)
app.get('/api/tourism', (req: Request, res: Response) => {
  res.json({ success: true, data: db.getTourism() });
});

// 6. Gallery
app.get('/api/gallery', (req: Request, res: Response) => {
  res.json({ success: true, data: db.getGallery() });
});

app.post('/api/gallery', (req: Request, res: Response) => {
  try {
    const { title, category, imageUrl, caption } = req.body;
    if (!title || !imageUrl) {
      return res.status(400).json({ success: false, error: "Title and imageUrl are required" });
    }
    const actor = (req.headers['x-admin-user'] as string) || 'admin';
    const role = (req.headers['x-admin-role'] as string) || 'Manager';
    const item = db.addGalleryItem({ title, category: category || 'dining', imageUrl, caption: caption || '' }, actor, role);
    res.json({ success: true, data: item });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/gallery/:id', (req: Request, res: Response) => {
  try {
    const actor = (req.headers['x-admin-user'] as string) || 'admin';
    const role = (req.headers['x-admin-role'] as string) || 'Manager';
    const deleted = db.deleteGalleryItem(req.params.id, actor, role);
    res.json({ success: deleted });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Bookings & Reservations
app.post('/api/bookings', (req: Request, res: Response) => {
  try {
    const { customerName, mobileNumber, email, category, preferredDate, preferredTime, guestCount, specialRequests } = req.body;
    
    if (!customerName || !customerName.trim()) {
      return res.status(400).json({ success: false, error: "Customer name is required." });
    }
    if (!mobileNumber || !mobileNumber.trim()) {
      return res.status(400).json({ success: false, error: "Mobile number is required." });
    }
    if (!preferredDate) {
      return res.status(400).json({ success: false, error: "Preferred date is required." });
    }

    const booking = db.createBooking({
      customerName: customerName.trim(),
      mobileNumber: mobileNumber.trim(),
      email: email ? email.trim() : undefined,
      category: category || 'Restaurant Dining',
      preferredDate,
      preferredTime: preferredTime || '19:00',
      guestCount: Math.max(1, parseInt(guestCount || '2', 10)),
      specialRequests: specialRequests ? specialRequests.trim() : ''
    });

    res.status(201).json({
      success: true,
      data: booking,
      message: "Reservation enquiry received successfully. Staff will confirm shortly."
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/bookings', (req: Request, res: Response) => {
  const { status, search } = req.query;
  let list = db.getBookings();
  if (status && status !== 'all') {
    list = list.filter(b => b.status === status);
  }
  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    list = list.filter(b => 
      b.customerName.toLowerCase().includes(q) ||
      b.referenceCode.toLowerCase().includes(q) ||
      b.mobileNumber.includes(q)
    );
  }
  res.json({ success: true, data: list });
});

app.put('/api/bookings/:id/status', (req: Request, res: Response) => {
  try {
    const { status, staffNotes } = req.body;
    if (!['Pending', 'Confirmed', 'Cancelled', 'Completed'].includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status value." });
    }
    const actor = (req.headers['x-admin-user'] as string) || 'staff';
    const role = (req.headers['x-admin-role'] as string) || 'Staff';
    const updated = db.updateBookingStatus(req.params.id, status, staffNotes, actor, role);
    if (!updated) {
      return res.status(404).json({ success: false, error: "Booking not found." });
    }
    res.json({ success: true, data: updated, message: `Status updated to ${status}` });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Contact Enquiries
app.post('/api/enquiries', (req: Request, res: Response) => {
  try {
    const { name, mobileNumber, email, subject, message } = req.body;
    if (!name || !mobileNumber || !message) {
      return res.status(400).json({ success: false, error: "Name, mobile number, and message are required." });
    }
    const enquiry = db.createEnquiry({
      name: name.trim(),
      mobileNumber: mobileNumber.trim(),
      email: email ? email.trim() : undefined,
      subject: subject || 'General Enquiry',
      message: message.trim()
    });
    res.status(201).json({ success: true, data: enquiry, message: "Thank you! Your message has been sent to Kalika management." });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/enquiries', (req: Request, res: Response) => {
  res.json({ success: true, data: db.getEnquiries() });
});

app.put('/api/enquiries/:id/status', (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const actor = (req.headers['x-admin-user'] as string) || 'staff';
    const role = (req.headers['x-admin-role'] as string) || 'Staff';
    const updated = db.updateEnquiryStatus(req.params.id, status, actor, role);
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9. Rooms & Accommodation
app.get('/api/rooms', (req: Request, res: Response) => {
  res.json({ success: true, data: db.getRooms() });
});

// 10. Admin Authentication & Dashboard Stats
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: "Username and password required." });
  }
  const result = db.authenticateAdmin(username, password);
  if (!result) {
    return res.status(401).json({ success: false, error: "Invalid credentials." });
  }
  res.json({ success: true, data: result });
});

app.get('/api/admin/stats', (req: Request, res: Response) => {
  res.json({ success: true, data: db.getStats() });
});

app.get('/api/admin/audit-logs', (req: Request, res: Response) => {
  res.json({ success: true, data: db.getAuditLogs() });
});

// Start Server with Vite Integration
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Kalika Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Server startup error:", err);
});
