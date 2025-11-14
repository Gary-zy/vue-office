# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server on port 5174 (or 5173 if default)
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally

### Installation
- `npm install` - Install frontend dependencies
- For full-stack setup, also install server dependencies: `cd server && npm install`

## Architecture Overview

### Project Type
Vue 3 + Vite frontend application with optional Node.js/Express backend. This is a modern technical showcase platform featuring a blog system and frontend tools collection.

### Key Technologies
- **Frontend**: Vue 3.5 (Composition API), Vite 7.x, Naive UI 2.x, Pinia, Vue Router 4, Tailwind CSS 4
- **Document Preview**: @vue-office components (docx, excel, pdf, pptx)
- **Rich Text**: WangEditor, Vditor Markdown editor
- **Backend (Optional)**: Node.js + Express with RESTful API

### Architecture Patterns

#### Frontend Structure
- **Component-based architecture** with reusable components in `src/components/`
- **Route-level code splitting** with lazy loading for performance
- **State management** using Pinia stores in `src/stores/`
- **Modular API layer** in `src/api/` with separate modules for different features

#### Key Directories
- `src/views/` - Page-level components organized by feature (blog/, tools/)
- `src/components/` - Reusable UI components and feature-specific components
- `src/stores/` - Pinia state management (blog.js, theme.js, user.js)
- `src/api/` - API request handling with Axios
- `src/assets/mock/` - Mock data for development without backend

#### Routing Architecture
- **Hierarchical routing** with clear separation:
  - `/` - Home page
  - `/blog/*` - Blog system (articles, categories, tags, archive)
  - `/tools/*` - Frontend tools (preview, editors, utilities)
  - Legacy route redirects for backward compatibility

#### State Management Pattern
- **Domain-specific stores**: Blog content, theme preferences, user state
- **Persistent state**: Theme preferences stored locally
- ** Reactive data flow**: Components access stores through composition API

### Special Features

#### Document Preview System
Integrated @vue-office components support:
- DOCX documents with high-fidelity rendering
- Excel spreadsheets with cell formatting
- PDF documents with zoom/navigation
- PowerPoint presentations with slide transitions

#### Theme System
- **Dark/Light mode toggle** with automatic persistence
- Naive UI theme integration
- Tailwind CSS for responsive styling

#### Content Management
- **Markdown rendering** with syntax highlighting (highlight.js)
- **Rich text editing** with WangEditor and Vditor
- **Blog system** with categories, tags, search, and archive functionality

## Development Notes

### Code Organization
- Use Vue 3 Composition API (`<script setup>`) for new components
- Follow existing naming conventions (PascalCase for components)
- Maintain separation between UI components and business logic
- Mock data in `src/assets/mock/` for frontend-only development

### Styling Approach
- **Tailwind CSS 4.x** for utility-first styling
- **Naive UI components** for consistent design system
- **Responsive design** with mobile-first approach
- Theme-aware components using CSS custom properties

### API Integration
- Frontend can work standalone with mock data
- Optional backend provides RESTful API for blog CRUD operations
- Axios configuration in `src/api/request.js` with baseURL switching

### Performance Considerations
- Route-level lazy loading implemented
- Component-level lazy loading for heavy features
- NProgress integration for loading states
- Icon optimization with unplugin-icons

## Backend Integration (Optional)

The project includes an optional Node.js/Express backend:
- Location: `server/` directory
- RESTful API for blog management
- JSON file-based storage (easily replaceable with database)
- CORS enabled for frontend-backend communication

To use the backend:
1. Install dependencies in `server/` directory
2. Run `npm run dev` in server directory
3. Update `baseURL` in `src/api/request.js` to point to `http://localhost:3000/api`