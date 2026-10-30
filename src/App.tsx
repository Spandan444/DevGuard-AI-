/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import type { ViewRoute, AppUser } from './types';
import { AuthService } from './services/authService';
import type { FindingWithMetadata, ScanWithOrigin } from './services/scanService';
import type { RepositoryWithOrigin } from './services/repositoryService';

import { LandingPage } from './routes/LandingPage';
import { DashboardPage } from './routes/DashboardPage';
import { RepositoriesPage } from './routes/RepositoriesPage';
import { ScansPage } from './routes/ScansPage';
import { SettingsPage } from './routes/SettingsPage';

import { LoginForm } from './features/auth/LoginForm';
import { RegisterForm } from './features/auth/RegisterForm';
import { DashboardHeader } from './components/navigation/DashboardHeader';
import { Sidebar } from './components/navigation/Sidebar';
import { ConnectRepoDialog } from './features/repositories/ConnectRepoDialog';
import { ArrowLeft } from 'lucide-react';
import { Button } from './components/ui/Button';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<ViewRoute>('landing');
  const [user, setUser] = useState<AppUser | null>(() => AuthService.getCurrentUser());
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isQuickConnectOpen, setIsQuickConnectOpen] = useState(false);
  const [inspectedFinding, setInspectedFinding] = useState<FindingWithMetadata | null>(null);

  // Auth Handlers
  const handleLoginSuccess = (authenticatedUser: AppUser) => {
    setUser(authenticatedUser);
    setCurrentRoute('dashboard');
  };

  const handleRegisterSuccess = (newUser: AppUser) => {
    setUser(newUser);
    setCurrentRoute('dashboard');
  };

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    setCurrentRoute('landing');
  };

  // Quick Action Handlers
  const handleSelectFindingFromDashboard = (finding: FindingWithMetadata) => {
    setInspectedFinding(finding);
    setCurrentRoute('scans');
  };

  const handleScanComplete = (scan: ScanWithOrigin) => {
    setCurrentRoute('scans');
  };

  const handleViewScansForRepo = (repo: RepositoryWithOrigin) => {
    setCurrentRoute('scans');
  };

  // Public Landing & Auth screens
  if (currentRoute === 'landing') {
    return (
      <LandingPage
        onNavigateLogin={() => setCurrentRoute('login')}
        onNavigateRegister={() => setCurrentRoute('register')}
        onExploreDemo={() => setCurrentRoute('dashboard')}
      />
    );
  }

  if (currentRoute === 'login') {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-[#DFE2F1] flex flex-col justify-center items-center p-6 relative">
        <div className="absolute top-6 left-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentRoute('landing')}
            className="text-xs text-[#94A3B8] gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Button>
        </div>
        <LoginForm
          onSuccess={handleLoginSuccess}
          onNavigateToRegister={() => setCurrentRoute('register')}
        />
      </div>
    );
  }

  if (currentRoute === 'register') {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-[#DFE2F1] flex flex-col justify-center items-center p-6 relative">
        <div className="absolute top-6 left-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentRoute('landing')}
            className="text-xs text-[#94A3B8] gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Button>
        </div>
        <RegisterForm
          onSuccess={handleRegisterSuccess}
          onNavigateToLogin={() => setCurrentRoute('login')}
        />
      </div>
    );
  }

  // Protected Dashboard Layout
  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#DFE2F1] flex flex-row antialiased selection:bg-[#7C3AED]/30 selection:text-white">
      {/* Sidebar */}
      <Sidebar
        currentRoute={currentRoute}
        onRouteChange={(route) => {
          if (route !== 'scans') {
            setInspectedFinding(null);
          }
          setCurrentRoute(route);
        }}
        onOpenConnectRepo={() => setIsQuickConnectOpen(true)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        <DashboardHeader
          currentRoute={currentRoute}
          user={user}
          onLogout={handleLogout}
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <main className="flex-1 pb-12">
          {currentRoute === 'dashboard' && (
            <DashboardPage
              onSelectFinding={handleSelectFindingFromDashboard}
              onNavigateToRepositories={() => setCurrentRoute('repositories')}
              onNavigateToScans={() => setCurrentRoute('scans')}
              onOpenConnectRepo={() => setIsQuickConnectOpen(true)}
            />
          )}

          {currentRoute === 'repositories' && (
            <RepositoriesPage
              onScanComplete={handleScanComplete}
              onViewScans={handleViewScansForRepo}
            />
          )}

          {currentRoute === 'scans' && (
            <ScansPage initialFinding={inspectedFinding} />
          )}

          {currentRoute === 'settings' && <SettingsPage />}
        </main>
      </div>

      {/* Global Quick Connect Repository Modal */}
      <ConnectRepoDialog
        isOpen={isQuickConnectOpen}
        onClose={() => setIsQuickConnectOpen(false)}
        onConnected={(newRepo) => {
          setCurrentRoute('repositories');
        }}
      />
    </div>
  );
}
