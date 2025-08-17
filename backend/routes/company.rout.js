import express from 'express';
import {
    createCompany,
    getCompany,
    updateCompany,
    deleteCompany,
    getAllCompanies,
    searchCompaniesByName,
    getCompaniesByLocation,
    aiEnhancedCompanySearch
} from '../conroller/company.controller.js';

import authMiddleware from '../middleware/isAuthenticated.js';

const router = express.Router();

/**
 * Company API Routes
 * Base path: /api/company
 */

// Create new company (Private)
router.post('/create', authMiddleware, createCompany);

// Get all companies (Public)
router.get('/all', getAllCompanies);

// Search by name (Public)
router.get('/search', searchCompaniesByName);

// Filter by location (Public)
router.get('/filter', getCompaniesByLocation);

// AI-powered smart search (Public)
router.get('/smart-search/ai', aiEnhancedCompanySearch);

// Get single company (Public)
router.get('/:companyId', getCompany);

// Update company (Private)
router.put('/:companyId', authMiddleware, updateCompany);

// Delete company (Private)
router.delete('/:companyId', authMiddleware, deleteCompany);

export default router;
