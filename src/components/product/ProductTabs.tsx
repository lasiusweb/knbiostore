'use client';

import { useState } from 'react';
import { Product } from '@/lib/types/product-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    FileText,
    Settings,
    Leaf,
    AlertTriangle,
    Shield,
    Phone,
    Mail,
    MapPin
} from 'lucide-react';

interface ProductTabsProps {
    product: Product;
}

type TabId = 'description' | 'specifications' | 'usage' | 'safety' | 'regulatory';

export function ProductTabs({ product }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState<TabId>('description');

    const tabs = [
        { id: 'description' as const, label: 'Description', icon: FileText },
        { id: 'specifications' as const, label: 'Specifications', icon: Settings },
        { id: 'usage' as const, label: 'Usage & Directions', icon: Leaf },
        { id: 'safety' as const, label: 'Safety', icon: AlertTriangle },
        { id: 'regulatory' as const, label: 'Regulatory', icon: Shield },
    ];

    return (
        <Card className="border-border/50">
            {/* Tab Headers */}
            <div className="border-b border-border overflow-x-auto">
                <div className="flex min-w-max">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab Content */}
            <CardContent className="p-6">
                {activeTab === 'description' && (
                    <div className="prose max-w-none">
                        <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                            {product.description}
                        </div>

                        {/* Target Crops */}
                        {product.targetCrops.length > 0 && (
                            <div className="mt-8">
                                <h4 className="text-lg font-semibold mb-4">Suitable For</h4>
                                <div className="flex flex-wrap gap-2">
                                    {product.targetCrops.map((crop, i) => (
                                        <Badge key={i} variant="secondary" className="text-sm">
                                            {crop}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Target Problems */}
                        {product.targetProblems.length > 0 && (
                            <div className="mt-6">
                                <h4 className="text-lg font-semibold mb-4">Problems It Solves</h4>
                                <div className="flex flex-wrap gap-2">
                                    {product.targetProblems.map((problem, i) => (
                                        <Badge key={i} variant="outline" className="text-sm border-destructive/50 text-destructive">
                                            {problem}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'specifications' && (
                    <div className="space-y-6">
                        {/* Basic Specs Table */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Product Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border rounded-lg overflow-hidden">
                                    <table className="w-full text-sm">
                                        <tbody>
                                            {product.gtin && (
                                                <tr className="border-b">
                                                    <td className="px-4 py-3 bg-muted/50 font-medium">GTIN (EAN/UPC)</td>
                                                    <td className="px-4 py-3 font-mono">{product.gtin}</td>
                                                </tr>
                                            )}
                                            <tr className="border-b">
                                                <td className="px-4 py-3 bg-muted/50 font-medium">Brand Name</td>
                                                <td className="px-4 py-3">{product.brandName}</td>
                                            </tr>
                                            {product.sku && (
                                                <tr className="border-b">
                                                    <td className="px-4 py-3 bg-muted/50 font-medium">SKU</td>
                                                    <td className="px-4 py-3 font-mono">{product.sku}</td>
                                                </tr>
                                            )}
                                            <tr className="border-b">
                                                <td className="px-4 py-3 bg-muted/50 font-medium">Country of Origin</td>
                                                <td className="px-4 py-3">{product.countryOfOrigin}</td>
                                            </tr>
                                            {product.netWeight && (
                                                <tr className="border-b">
                                                    <td className="px-4 py-3 bg-muted/50 font-medium">Net Weight</td>
                                                    <td className="px-4 py-3">{product.netWeight}</td>
                                                </tr>
                                            )}
                                            {product.grossWeight && (
                                                <tr className="border-b">
                                                    <td className="px-4 py-3 bg-muted/50 font-medium">Gross Weight</td>
                                                    <td className="px-4 py-3">{product.grossWeight}</td>
                                                </tr>
                                            )}
                                            {product.netContent && (
                                                <tr className="border-b">
                                                    <td className="px-4 py-3 bg-muted/50 font-medium">Net Content</td>
                                                    <td className="px-4 py-3">{product.netContent}</td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="px-4 py-3 bg-muted/50 font-medium">Shelf Life</td>
                                                <td className="px-4 py-3">{product.shelfLife}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Chemical Composition */}
                                {product.chemicalComposition.length > 0 && (
                                    <div className="border rounded-lg overflow-hidden">
                                        <div className="px-4 py-3 bg-muted/50 font-medium border-b">
                                            Chemical Composition
                                        </div>
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b bg-muted/30">
                                                    <th className="px-4 py-2 text-left font-medium">Ingredient</th>
                                                    <th className="px-4 py-2 text-left font-medium">Content</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {product.chemicalComposition.map((comp, i) => (
                                                    <tr key={i} className="border-b last:border-0">
                                                        <td className="px-4 py-2">{comp.ingredient}</td>
                                                        <td className="px-4 py-2 font-mono text-xs">{comp.percentage}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'usage' && (
                    <div className="space-y-8">
                        {/* Directions of Use */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Leaf className="w-5 h-5 text-primary" />
                                Directions of Use
                            </h4>
                            <div className="whitespace-pre-line text-muted-foreground leading-relaxed bg-muted/30 p-6 rounded-lg">
                                {product.directionsOfUse}
                            </div>
                        </div>

                        {/* Standard Instructions */}
                        {product.standardInstructions && (
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Standard Instructions</h4>
                                <p className="text-muted-foreground">{product.standardInstructions}</p>
                            </div>
                        )}

                        {/* Recommendations */}
                        {product.recommendations && (
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Recommendations</h4>
                                <p className="text-muted-foreground">{product.recommendations}</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'safety' && (
                    <div className="space-y-8">
                        {/* Warning Statement */}
                        {product.warningStatement && (
                            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
                                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-destructive">
                                    <AlertTriangle className="w-5 h-5" />
                                    Warning Statement
                                </h4>
                                <p className="text-foreground">{product.warningStatement}</p>
                            </div>
                        )}

                        {/* Precautions */}
                        {product.precautions.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Precautions</h4>
                                <ul className="space-y-2">
                                    {product.precautions.map((precaution, i) => (
                                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                            <span className="shrink-0 w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs font-bold">
                                                {i + 1}
                                            </span>
                                            {precaution}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Antidote Statement */}
                        {product.antidoteStatement && (
                            <div>
                                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-primary" />
                                    Antidote / First Aid
                                </h4>
                                <p className="text-muted-foreground bg-muted/30 p-4 rounded-lg">
                                    {product.antidoteStatement}
                                </p>
                            </div>
                        )}

                        {/* Leaflet Info */}
                        {product.leafletInfo && (
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Leaflet Information</h4>
                                <p className="text-muted-foreground">{product.leafletInfo}</p>
                            </div>
                        )}

                        {/* Customer Care */}
                        <Card className="bg-primary/5 border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Phone className="w-5 h-5 text-primary" />
                                    Customer Care
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-muted-foreground" />
                                    <span>{product.customerCareDetails.phone}</span>
                                </div>
                                {product.customerCareDetails.email && (
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        <span>{product.customerCareDetails.email}</span>
                                    </div>
                                )}
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                                    <span className="text-sm">{product.customerCareDetails.address}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === 'regulatory' && (
                    <div className="space-y-8">
                        {/* Regulatory Compliance */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Regulatory Compliance</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {product.cbirc && (
                                    <div className="border rounded-lg p-4">
                                        <span className="text-sm text-muted-foreground block mb-1">CBIRC Number</span>
                                        <span className="font-mono font-medium">{product.cbirc}</span>
                                    </div>
                                )}
                                {product.manufacturingLicence && (
                                    <div className="border rounded-lg p-4">
                                        <span className="text-sm text-muted-foreground block mb-1">Manufacturing Licence</span>
                                        <span className="font-mono font-medium">{product.manufacturingLicence}</span>
                                    </div>
                                )}
                                {product.stateRegistration && (
                                    <div className="border rounded-lg p-4">
                                        <span className="text-sm text-muted-foreground block mb-1">State Registration</span>
                                        <span className="font-mono font-medium">{product.stateRegistration}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Marketed By */}
                        <Card className="bg-muted/30 border-border/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Marketed By</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {product.marketedBy.name && (
                                    <p className="font-semibold">{product.marketedBy.name}</p>
                                )}
                                <p className="text-sm text-muted-foreground">{product.marketedBy.address}</p>
                                <p className="text-sm">
                                    <span className="text-muted-foreground">Phone:</span> {product.marketedBy.phone}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Tags */}
                        {product.tags.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Product Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag, i) => (
                                        <Badge key={i} variant="outline" className="text-sm">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
