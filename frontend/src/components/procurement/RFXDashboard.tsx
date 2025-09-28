import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  FileText,
  Clock,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  MoreHorizontal,
  Upload,
  Eye,
} from "lucide-react";

interface RFXDashboardProps {
  onSelectRFX: (rfx: any) => void;
  onNavigate: (view: string) => void;
}

export default function RFXDashboard({ onSelectRFX, onNavigate }: RFXDashboardProps) {
  const rfxProjects = [
    {
      id: "RFX-2024-001",
      title: "Industrial Equipment Procurement",
      category: "Manufacturing",
      status: "Active",
      deadline: "2024-12-15",
      suppliers: 8,
      offers: 5,
      estimatedValue: "$2.5M",
      progress: 75,
      priority: "High",
      lastActivity: "2 hours ago",
    },
    {
      id: "RFX-2024-002",
      title: "IT Infrastructure Upgrade",
      category: "Technology",
      status: "Evaluation",
      deadline: "2024-12-20",
      suppliers: 12,
      offers: 8,
      estimatedValue: "$1.8M",
      progress: 90,
      priority: "Critical",
      lastActivity: "30 minutes ago",
    },
    {
      id: "RFX-2024-003",
      title: "Office Supplies & Materials",
      category: "General",
      status: "Draft",
      deadline: "2024-12-30",
      suppliers: 6,
      offers: 2,
      estimatedValue: "$450K",
      progress: 25,
      priority: "Medium",
      lastActivity: "1 day ago",
    },
  ];

  const stats = [
    { title: "Active RFX Projects", value: "12", change: "+2", icon: FileText, color: "text-blue-600" },
    { title: "Supplier Offers", value: "47", change: "+15", icon: Users, color: "text-green-600" },
    { title: "Total Value", value: "$8.2M", change: "+12%", icon: DollarSign, color: "text-purple-600" },
    { title: "Avg. Savings", value: "23%", change: "+3%", icon: TrendingUp, color: "text-orange-600" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800";
      case "Evaluation":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen space-y-6 overflow-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">RFX Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Manage your procurement projects and analyze supplier offers
          </p>
        </div>
        <Button onClick={() => onNavigate("upload")}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Offers
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {stats.map((stat, index) => (
          <Card key={index} className="w-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active RFX Projects */}
      <Card className="w-full flex-1 flex flex-col overflow-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Active RFX Projects</span>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rfxProjects.map((project, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-4 hover:bg-accent/70 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {project.id} • {project.category}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    Due {project.deadline}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                    {project.offers}/{project.suppliers} offers
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
                    {project.estimatedValue}
                  </div>
                  <div className="text-muted-foreground">Updated {project.lastActivity}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        onSelectRFX(project);
                        onNavigate("analysis");
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Analysis
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        onSelectRFX(project);
                        onNavigate("upload");
                      }}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Offers
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Create New RFX</h3>
                <p className="text-sm text-muted-foreground">Start a new procurement project</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Review Pending</h3>
                <p className="text-sm text-muted-foreground">3 offers awaiting review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium">Deadline Alerts</h3>
                <p className="text-sm text-muted-foreground">2 RFX projects due soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
