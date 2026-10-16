import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np

os.makedirs('report_diagrams', exist_ok=True)

# Common styling
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = ['Nirmala UI', 'Segoe UI', 'DejaVu Sans', 'Arial']

# -----------------------------------------------------------------
# DIAGRAM 1: LAYERED SYSTEM ARCHITECTURE
# -----------------------------------------------------------------
def create_system_architecture_diagram():
    fig, ax = plt.subplots(figsize=(12, 7.5), dpi=300)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Background canvas
    ax.add_patch(patches.Rectangle((0, 0), 100, 100, color='#F8FAFC', ec='none'))

    # Title header
    ax.text(50, 96, "APSRTC VELOCITY — LAYERED FRONTEND SYSTEM ARCHITECTURE", 
            ha='center', va='center', fontsize=15, fontweight='bold', color='#0F172A')
    ax.text(50, 92.5, "Decoupled 4-Tier Architecture Built with React 18, TypeScript, and In-Browser State Machine", 
            ha='center', va='center', fontsize=10, style='italic', color='#64748B')

    # Tier 1: Presentation Layer
    ax.add_patch(patches.FancyBboxPatch((5, 68), 90, 21, boxstyle="round,pad=1.5", 
                                        fc='#FFFFFF', ec='#991B1B', lw=2))
    ax.text(8, 86, "TIER 1: PRESENTATION & VERNACULAR UI LAYER (React 18 + Tailwind CSS)", 
            fontsize=11, fontweight='bold', color='#991B1B')
    
    comp_boxes = [
        (8, 70, 17, 13, "Hero Booking Card\n• Route Swap Icon\n• Quick-Date Chips\n• Bilingual Switcher", '#FEF2F2', '#DC2626'),
        (26.5, 70, 17, 13, "Faceted Search SRP\n• Sticky Summary Bar\n• AC / Sleeper Filters\n• Scarcity Badges", '#FEF2F2', '#DC2626'),
        (45, 70, 17, 13, "2-Deck Seating Canvas\n• Lower/Upper Tabs\n• Ladies Quota (Pink)\n• Driver Orientation", '#FEF2F2', '#DC2626'),
        (63.5, 70, 17, 13, "Checkout & Payment\n• 10-Min Lock Timer\n• Dynamic UPI QR\n• Senior Concession", '#FEF2F2', '#DC2626'),
        (82, 70, 11, 13, "Boarding Pass\n• Conductor QR\n• Print CSS\n• LiveTrack", '#FEF2F2', '#DC2626')
    ]
    for x, y, w, h, text, bg, border in comp_boxes:
        ax.add_patch(patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.8", fc=bg, ec=border, lw=1.2))
        ax.text(x + w/2, y + h/2, text, ha='center', va='center', fontsize=7.5, color='#1E293B', fontweight='medium')

    # Arrow 1 down
    ax.annotate('', xy=(50, 64), xytext=(50, 68),
                arrowprops=dict(arrowstyle="->", color='#991B1B', lw=2))

    # Tier 2: State Machine & Domain Logic
    ax.add_patch(patches.FancyBboxPatch((5, 46), 90, 17, boxstyle="round,pad=1.5", 
                                        fc='#FFFFFF', ec='#1E3A8A', lw=2))
    ax.text(8, 60.5, "TIER 2: CONTROLLER & DOMAIN STATE MACHINE (Deterministic Transitions)", 
            fontsize=11, fontweight='bold', color='#1E3A8A')
    
    tier2_boxes = [
        (8, 48, 20, 10, "Booking State Machine\n• SEARCHING -> SEAT_MAP\n• PASSENGERS -> UPI_HOLD\n• TICKET_CONFIRMED", '#EFF6FF', '#2563EB'),
        (29.5, 48, 19, 10, "Concession Calculator\n• Senior Citizen 25% Off\n• Round-Trip 10% Off\n• GST & Toll Calculation", '#EFF6FF', '#2563EB'),
        (50, 48, 19, 10, "Seat Lock Engine\n• 600s Countdown Timer\n• Race-Condition Guard\n• Auto-Release on Timeout", '#EFF6FF', '#2563EB'),
        (70.5, 48, 22.5, 10, "Bilingual Translation Engine\n• English ↔ Telugu Map\n• Station Name Localization\n• Bus Class Localization", '#EFF6FF', '#2563EB')
    ]
    for x, y, w, h, text, bg, border in tier2_boxes:
        ax.add_patch(patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.8", fc=bg, ec=border, lw=1.2))
        ax.text(x + w/2, y + h/2, text, ha='center', va='center', fontsize=7.5, color='#1E293B', fontweight='medium')

    # Arrow 2 down
    ax.annotate('', xy=(50, 42), xytext=(50, 46),
                arrowprops=dict(arrowstyle="->", color='#1E3A8A', lw=2))

    # Tier 3: Core Service & Simulation Engines
    ax.add_patch(patches.FancyBboxPatch((5, 24), 90, 17, boxstyle="round,pad=1.5", 
                                        fc='#FFFFFF', ec='#D97706', lw=2))
    ax.text(8, 38.5, "TIER 3: CORE TRANSIT ENGINES & TELEMETRY SIMULATION", 
            fontsize=11, fontweight='bold', color='#B45309')

    tier3_boxes = [
        (8, 26, 27, 10, "Sub-5ms Fuzzy Station Indexer\n• 40+ AP & Telangana Transit Hubs\n• Levenshtein Dist & Substring Search\n• City Bus Stands vs En-route Stops", '#FFFBEB', '#D97706'),
        (37, 26, 26, 10, "LiveTrack GPS Telemetry\n• Real-Time Speed Simulation (78 km/h)\n• Checkpoint Milestone Stepper\n• Vehicle Registration & Delay Estimator", '#FFFBEB', '#D97706'),
        (65, 26, 28, 10, "Cancellation Refund Simulator\n• APSRTC Government Rule Engine\n• Dynamic Departure Time Slider\n• Refund Tier Deductions (10%, 25%, 50%)", '#FFFBEB', '#D97706')
    ]
    for x, y, w, h, text, bg, border in tier3_boxes:
        ax.add_patch(patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.8", fc=bg, ec=border, lw=1.2))
        ax.text(x + w/2, y + h/2, text, ha='center', va='center', fontsize=7.5, color='#1E293B', fontweight='medium')

    # Arrow 3 down
    ax.annotate('', xy=(50, 20), xytext=(50, 24),
                arrowprops=dict(arrowstyle="->", color='#D97706', lw=2))

    # Tier 4: Storage, Build, and Tooling
    ax.add_patch(patches.FancyBboxPatch((5, 3), 90, 16, boxstyle="round,pad=1.5", 
                                        fc='#FFFFFF', ec='#0F172A', lw=2))
    ax.text(8, 16.5, "TIER 4: INFRASTRUCTURE, PERSISTENCE & BUILD PIPELINE", 
            fontsize=11, fontweight='bold', color='#0F172A')

    tier4_boxes = [
        (8, 5, 20, 9, "Vite 5 Bundler\n• 350ms Hot Reload\n• ES Modules Tree-shaking", '#F1F5F9', '#475569'),
        (29.5, 5, 19, 9, "TypeScript 5.6 Engine\n• Strict Type Interfaces\n• Null-Safety Enforcement", '#F1F5F9', '#475569'),
        (50, 5, 19, 9, "Local Storage Persistence\n• PNR Booking Cache\n• Concession Cache", '#F1F5F9', '#475569'),
        (70.5, 5, 22.5, 9, "Git & GitHub CI/CD\n• Atomic Ralph Stories\n• Main Branch Deploy Ready", '#F1F5F9', '#475569')
    ]
    for x, y, w, h, text, bg, border in tier4_boxes:
        ax.add_patch(patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.8", fc=bg, ec=border, lw=1.2))
        ax.text(x + w/2, y + h/2, text, ha='center', va='center', fontsize=7.5, color='#1E293B', fontweight='medium')

    plt.tight_layout()
    plt.savefig('report_diagrams/diag_01_system_architecture.png', bbox_inches='tight')
    plt.close()
    print("diag_01_system_architecture.png created")

# -----------------------------------------------------------------
# DIAGRAM 2: FINITE STATE MACHINE & USER FUNNEL WORKFLOW
# -----------------------------------------------------------------
def create_state_machine_diagram():
    fig, ax = plt.subplots(figsize=(12, 6.8), dpi=300)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    ax.add_patch(patches.Rectangle((0, 0), 100, 100, color='#FFFFFF', ec='none'))

    # Header
    ax.text(50, 96, "APSRTC VELOCITY — BOOKING FUNNEL FINITE STATE MACHINE", 
            ha='center', va='center', fontsize=14, fontweight='bold', color='#0F172A')
    ax.text(50, 92, "Deterministic State Transitions with Backward Safety & Zero Loss of Booking Context", 
            ha='center', va='center', fontsize=9.5, style='italic', color='#64748B')

    # States
    states = [
        (5, 60, 16, 22, "STATE 01\nSEARCH FORM\n\n• Origin / Destination\n• Quick Date Chips\n• Bilingual Toggle\n• Route Swap", '#FEF2F2', '#DC2626'),
        (26, 60, 16, 22, "STATE 02\nRESULTS (SRP)\n\n• Bus Service List\n• Faceted Filter Bar\n• Amaravathi / Garuda\n• Scarcity Badges", '#EFF6FF', '#2563EB'),
        (47, 60, 16, 22, "STATE 03\nSEAT SELECTION\n\n• 2-Deck Bus Canvas\n• Lower/Upper Tabs\n• Ladies Quota (Pink)\n• 6-Seat Max Cap", '#ECFDF5', '#059669'),
        (68, 60, 16, 22, "STATE 04\nPASSENGERS\n\n• Boarding / Drop Stn\n• Age / Gender Inputs\n• 25% Senior Discount\n• WhatsApp Opt-in", '#FFFBEB', '#D97706'),
        (89, 60, 9.5, 22, "STATE 05\nUPI HOLD\n\n• 10m Timer\n• QR Code\n• VPA Entry", '#F5F3FF', '#7C3AED')
    ]

    for x, y, w, h, text, bg, border in states:
        ax.add_patch(patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=1.2", fc=bg, ec=border, lw=1.8))
        ax.text(x + w/2, y + h/2, text, ha='center', va='center', fontsize=7.5, color='#0F172A', fontweight='medium')

    # Forward arrows (top line)
    arrow_pairs = [
        ((21.5, 71), (25.5, 71), "Submit Search"),
        ((42.5, 71), (46.5, 71), "Select Bus"),
        ((63.5, 71), (67.5, 71), "Confirm Seats"),
        ((84.5, 71), (88.5, 71), "Proceed")
    ]
    for (x1, y1), (x2, y2), label in arrow_pairs:
        ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                    arrowprops=dict(arrowstyle="->", color='#059669', lw=2))
        ax.text((x1+x2)/2, y1 + 3, label, ha='center', va='bottom', fontsize=6.5, fontweight='bold', color='#059669')

    # Backward arrows (bottom line)
    back_arrows = [
        ((25.5, 63), (21.5, 63), "Modify Search"),
        ((46.5, 63), (42.5, 63), "Change Bus"),
        ((67.5, 63), (63.5, 63), "Change Seats"),
        ((88.5, 63), (84.5, 63), "Cancel Pay")
    ]
    for (x1, y1), (x2, y2), label in back_arrows:
        ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                    arrowprops=dict(arrowstyle="->", color='#DC2626', lw=1.5, linestyle='--'))
        ax.text((x1+x2)/2, y1 - 3, label, ha='center', va='top', fontsize=6.5, fontweight='bold', color='#DC2626')

    # Post-payment states (Bottom row)
    post_states = [
        (20, 15, 25, 24, "STATE 06: DIGITAL M-TICKET ISSUED\n\n• High-Contrast Conductor QR Barcode\n• PNR, Service Number, Journey Timestamp\n• Exact Boarding Landmark & Map Pin\n• Printable Media Stylesheet (Ctrl+P)", '#F0FDF4', '#16A34A'),
        (55, 15, 25, 24, "STATE 07: APSRTC LIVETRACK & REFUNDS\n\n• Real-Time GPS Telemetry Speed Gauge (78 km/h)\n• Route Milestone Stepper (Passed vs Upcoming)\n• 24/7 Helpline (0866-2570005) & Conductor Call\n• Interactive Cancellation Simulator (Refund Tiers)", '#EFF6FF', '#2563EB')
    ]
    for x, y, w, h, text, bg, border in post_states:
        ax.add_patch(patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=1.2", fc=bg, ec=border, lw=2))
        ax.text(x + w/2, y + h/2, text, ha='center', va='center', fontsize=7.8, color='#0F172A', fontweight='medium')

    # Arrow from State 05 down to State 06
    ax.annotate('', xy=(32.5, 39.5), xytext=(94, 59.5),
                arrowprops=dict(arrowstyle="->", color='#16A34A', lw=2.2, connectionstyle="angle,angleA=0,angleB=90,rad=10"))
    ax.text(65, 48, "Payment Verified (UPI Webhook / Instant QR)", ha='center', va='bottom', fontsize=7.5, fontweight='bold', color='#16A34A')

    # Arrow from State 06 to State 07
    ax.annotate('', xy=(54.5, 27), xytext=(45.5, 27),
                arrowprops=dict(arrowstyle="<->", color='#2563EB', lw=1.8))
    ax.text(50, 30, "Track Live / Manage", ha='center', va='bottom', fontsize=7, fontweight='bold', color='#2563EB')

    plt.tight_layout()
    plt.savefig('report_diagrams/diag_02_state_machine_funnel.png', bbox_inches='tight')
    plt.close()
    print("diag_02_state_machine_funnel.png created")

# -----------------------------------------------------------------
# DIAGRAM 3: JAKOB NIELSEN 10 HEURISTICS COMPARATIVE RADAR CHART
# -----------------------------------------------------------------
def create_heuristics_radar_chart():
    categories = [
        '1. Visibility of\nSystem Status',
        '2. Match Between System\n& Real World',
        '3. User Control\n& Freedom',
        '4. Consistency\n& Standards',
        '5. Error\nPrevention',
        '6. Recognition Rather\nThan Recall',
        '7. Flexibility &\nEfficiency of Use',
        '8. Aesthetic &\nMinimalist Design',
        '9. Help Users Recognize\n& Recover Errors',
        '10. Help &\nDocumentation'
    ]
    N = len(categories)

    # Legacy scores (out of 10) vs APSRTC Velocity scores
    legacy_scores = [2.5, 3.8, 1.2, 4.0, 2.8, 3.0, 2.2, 2.0, 2.5, 3.5]
    velocity_scores = [9.5, 9.2, 9.8, 9.4, 9.0, 9.5, 9.6, 9.8, 9.2, 9.4]

    # Repeat first score to close polygon
    legacy_scores += legacy_scores[:1]
    velocity_scores += velocity_scores[:1]

    angles = [n / float(N) * 2 * np.pi for n in range(N)]
    angles += angles[:1]

    fig, ax = plt.subplots(figsize=(9, 8), subplot_kw=dict(polar=True), dpi=300)
    
    # Draw one axe per variable and add labels
    plt.xticks(angles[:-1], categories, color='#334155', size=8.5, fontweight='medium')

    # Draw ylabels
    ax.set_rlabel_position(30)
    plt.yticks([2, 4, 6, 8, 10], ["2/10", "4/10", "6/10", "8/10", "10/10"], color="#94A3B8", size=7.5)
    plt.ylim(0, 10)

    # Plot Legacy Website
    ax.plot(angles, legacy_scores, linewidth=2, linestyle='solid', color='#DC2626', label='Legacy Portal (apsrtconline.in) [Avg: 2.7/10]')
    ax.fill(angles, legacy_scores, color='#DC2626', alpha=0.18)

    # Plot APSRTC Velocity
    ax.plot(angles, velocity_scores, linewidth=2.5, linestyle='solid', color='#059669', label='APSRTC Velocity Redesign [Avg: 9.4/10]')
    ax.fill(angles, velocity_scores, color='#059669', alpha=0.25)

    plt.title("Jakob Nielsen 10 Usability Heuristics Audit\nLegacy Portal vs. APSRTC Velocity", size=13, fontweight='bold', color='#0F172A', y=1.12)
    plt.legend(loc='upper right', bbox_to_anchor=(1.25, 1.1), fontsize=8.5, frameon=True, facecolor='#FFFFFF')

    plt.tight_layout()
    plt.savefig('report_diagrams/diag_03_heuristics_radar.png', bbox_inches='tight')
    plt.close()
    print("diag_03_heuristics_radar.png created")

# -----------------------------------------------------------------
# DIAGRAM 4: COMPONENT HIERARCHY & DATA FLOW
# -----------------------------------------------------------------
def create_component_hierarchy_diagram():
    fig, ax = plt.subplots(figsize=(12, 6.8), dpi=300)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')
    ax.add_patch(patches.Rectangle((0, 0), 100, 100, color='#F8FAFC', ec='none'))

    ax.text(50, 96, "REACT 18 COMPONENT TREE & UNIDIRECTIONAL DATA PIPELINE", 
            ha='center', va='center', fontsize=14, fontweight='bold', color='#0F172A')
    ax.text(50, 92, "Props Down, Action Dispatches Up, Synchronized with Session Cache", 
            ha='center', va='center', fontsize=9.5, style='italic', color='#64748B')

    # Root Node
    ax.add_patch(patches.FancyBboxPatch((40, 78), 20, 10, boxstyle="round,pad=1.0", fc='#0F172A', ec='#0F172A'))
    ax.text(50, 83, "App.tsx (Root Context)\n• Language State (EN/TE)\n• Active Booking Context", 
            ha='center', va='center', fontsize=8, fontweight='bold', color='#FFFFFF')

    # Mid Level Nodes
    mid_nodes = [
        (5, 54, 18, 12, "Navbar.tsx\n• Global Brand Logo\n• Telugu Toggle\n• 24/7 Helpline Call", '#EFF6FF', '#2563EB'),
        (26, 54, 22, 12, "HeroSearchCard.tsx\n• StationAutocomplete\n• RouteSwapButton\n• QuickDateChips", '#FEF2F2', '#DC2626'),
        (51, 54, 22, 12, "SearchResults.tsx\n• RouteSummaryBar\n• FilterSidebar\n• BusCard (Amenities)", '#FFFBEB', '#D97706'),
        (76, 54, 19, 12, "SeatSelectionModal.tsx\n• DeckSwitcher (Lower/Upper)\n• SeatCanvas (Grid)\n• FareSummaryBar", '#ECFDF5', '#059669')
    ]
    for x, y, w, h, text, bg, border in mid_nodes:
        ax.add_patch(patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.8", fc=bg, ec=border, lw=1.5))
        ax.text(x + w/2, y + h/2, text, ha='center', va='center', fontsize=7.5, color='#0F172A', fontweight='medium')
        # Arrow from root to mid
        ax.annotate('', xy=(x + w/2, y + h), xytext=(50, 78),
                    arrowprops=dict(arrowstyle="->", color='#94A3B8', lw=1.2))

    # Leaf Nodes
    leaf_nodes = [
        (8, 22, 24, 16, "PassengerForm.tsx\n• Dynamic Passenger Inputs\n• Senior Concession Check (25%)\n• Boarding / Drop Radio Group\n• WhatsApp Ticket Opt-in", '#FEF2F2', '#DC2626'),
        (38, 22, 24, 16, "UpiPaymentModal.tsx\n• 10:00 Countdown Timer\n• Dynamic UPI QR Generator\n• VPA Field Validation\n• Fare Breakdown Summary", '#EFF6FF', '#2563EB'),
        (68, 22, 25, 16, "DigitalTicket.tsx & LiveTrack\n• Conductor Boarding QR Barcode\n• Print Media Stylesheet (Ctrl+P)\n• Live GPS Telemetry Gauge\n• Milestone Progress Stepper", '#ECFDF5', '#059669')
    ]
    for x, y, w, h, text, bg, border in leaf_nodes:
        ax.add_patch(patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=1.0", fc=bg, ec=border, lw=1.5))
        ax.text(x + w/2, y + h/2, text, ha='center', va='center', fontsize=7.5, color='#0F172A', fontweight='medium')

    # Connect Mid to Leaf
    ax.annotate('', xy=(20, 38), xytext=(37, 54), arrowprops=dict(arrowstyle="->", color='#DC2626', lw=1.4))
    ax.annotate('', xy=(50, 38), xytext=(85, 54), arrowprops=dict(arrowstyle="->", color='#2563EB', lw=1.4))
    ax.annotate('', xy=(80, 38), xytext=(50, 38), arrowprops=dict(arrowstyle="->", color='#059669', lw=1.4))

    # Bottom Utility Engine Banner
    ax.add_patch(patches.FancyBboxPatch((8, 4), 85, 11, boxstyle="round,pad=0.8", fc='#FFFFFF', ec='#64748B', lw=1.2))
    ax.text(50.5, 9.5, "SHARED UTILITIES & SERVICE LAYER: mockData.ts (40+ AP Stations) | translations.ts (Bilingual Dictionary) | types.ts", 
            ha='center', va='center', fontsize=8, fontweight='bold', color='#475569')

    plt.tight_layout()
    plt.savefig('report_diagrams/diag_04_component_hierarchy.png', bbox_inches='tight')
    plt.close()
    print("diag_04_component_hierarchy.png created")

# -----------------------------------------------------------------
# DIAGRAM 5: INFORMATION ARCHITECTURE & SITEMAP
# -----------------------------------------------------------------
def create_information_architecture_diagram():
    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=300)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')
    ax.add_patch(patches.Rectangle((0, 0), 100, 100, color='#FFFFFF', ec='none'))

    ax.text(50, 96, "APSRTC VELOCITY — SITE INFORMATION ARCHITECTURE (IA)", 
            ha='center', va='center', fontsize=14, fontweight='bold', color='#0F172A')
    ax.text(50, 92, "Hierarchical Navigation and Content Organization for Millions of Daily Commuters", 
            ha='center', va='center', fontsize=9.5, style='italic', color='#64748B')

    # Root Level: Global Header / Portal Entry
    ax.add_patch(patches.FancyBboxPatch((35, 78), 30, 10, boxstyle="round,pad=1.0", fc='#991B1B', ec='#991B1B'))
    ax.text(50, 83, "apsrtconline.in (Velocity Redesign)\nGlobal Header & Utility Navigation", 
            ha='center', va='center', fontsize=8.5, fontweight='bold', color='#FFFFFF')

    # Main Branches
    branches = [
        (4, 52, 20, 15, "1. BOOK BUS TICKETS\n• Hero Booking Card\n• Station Autocomplete\n• Quick-Date Selector\n• 10% Round-Trip Badge", '#FEF2F2', '#DC2626'),
        (27.5, 52, 21, 15, "2. BUS SEARCH & SRP\n• Service Listing & Times\n• Class Filters (AC/Non-AC)\n• 2-Deck Seating Canvas\n• Ladies Quota Berths", '#EFF6FF', '#2563EB'),
        (51.5, 52, 21, 15, "3. MANAGE BOOKINGS\n• PNR Status Lookup\n• Digital m-Ticket Pass\n• Conductor QR Barcode\n• Cancellation Simulator", '#ECFDF5', '#059669'),
        (75.5, 52, 20.5, 15, "4. TRANSIT TELEMETRY\n• 'APSRTC LiveTrack'\n• Real-Time GPS Gauge\n• Milestone Stepper\n• 24/7 Helpline & Grievance", '#FFFBEB', '#D97706')
    ]
    for x, y, w, h, text, bg, border in branches:
        ax.add_patch(patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.8", fc=bg, ec=border, lw=1.5))
        ax.text(x + w/2, y + h/2, text, ha='center', va='center', fontsize=7.5, color='#0F172A', fontweight='medium')
        # Arrow from header to branches
        ax.annotate('', xy=(x + w/2, y + h), xytext=(50, 78),
                    arrowprops=dict(arrowstyle="->", color='#94A3B8', lw=1.3))

    # Sub-features (Level 3)
    level3_boxes = [
        (4, 18, 20, 24, "COMMUTER TOOLS\n\n• 1-Tap 180° Route Swap\n• Fuzzy Station Search\n• Bilingual Mode (English/Telugu)\n• Sovereign GovTech Theme", '#F8FAFC', '#64748B'),
        (27.5, 18, 21, 24, "SEAT & PASSENGER\n\n• Lower / Upper Berth Tabs\n• Concession Engine (25%)\n• Boarding Landmarks\n• 6-Seat Safety Ceiling", '#F8FAFC', '#64748B'),
        (51.5, 18, 21, 24, "PAYMENT & PASS\n\n• 10-Min Temporary Hold\n• Instant UPI QR Code\n• Zero Convenience Fees\n• Printable Media Pass", '#F8FAFC', '#64748B'),
        (75.5, 18, 20.5, 24, "CITIZEN SAFETY\n\n• 149 / 1902 Toll-Free\n• Conductor Direct Dial\n• Real-time Delay Alerts\n• Non-Surge Guarantee", '#F8FAFC', '#64748B')
    ]
    for x, y, w, h, text, bg, border in level3_boxes:
        ax.add_patch(patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.8", fc=bg, ec=border, lw=1.2))
        ax.text(x + w/2, y + h/2, text, ha='center', va='center', fontsize=7.2, color='#1E293B', fontweight='medium')
        ax.annotate('', xy=(x + w/2, y + h), xytext=(x + w/2, 52),
                    arrowprops=dict(arrowstyle="->", color='#94A3B8', lw=1.1, linestyle=':'))

    # Footer banner
    ax.add_patch(patches.FancyBboxPatch((4, 4), 92, 8, boxstyle="round,pad=0.6", fc='#0F172A', ec='#0F172A'))
    ax.text(50, 8, "CROSS-CUTTING ACCESSIBILITY: WCAG 2.1 AA High Contrast | 48px Minimum Touch Targets | Full Keyboard Tab Navigation", 
            ha='center', va='center', fontsize=7.5, fontweight='bold', color='#FFFFFF')

    plt.tight_layout()
    plt.savefig('report_diagrams/diag_05_information_architecture.png', bbox_inches='tight')
    plt.close()
    print("diag_05_information_architecture.png created")

if __name__ == '__main__':
    create_system_architecture_diagram()
    create_state_machine_diagram()
    create_heuristics_radar_chart()
    create_component_hierarchy_diagram()
    create_information_architecture_diagram()
    print("All 5 publication technical diagrams generated successfully!")
