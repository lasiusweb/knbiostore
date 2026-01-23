'use client';

import { Product } from '@/lib/types/product-types';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

interface ProductSpecsProps {
    product: Product;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-primary rounded-full" />
                        Physical Specifications
                    </h3>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-semibold text-muted-foreground">GTIN/UPC</TableCell>
                                <TableCell className="font-mono text-primary font-bold">{product.gtin}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-semibold text-muted-foreground">Net Weight</TableCell>
                                <TableCell>{product.netWeight}</TableCell>
                            </TableRow>
                            {product.netContent && (
                                <TableRow>
                                    <TableCell className="font-semibold text-muted-foreground">Net Content</TableCell>
                                    <TableCell>{product.netContent}</TableCell>
                                </TableRow>
                            )}
                            <TableRow>
                                <TableCell className="font-semibold text-muted-foreground">Gross Weight</TableCell>
                                <TableCell>{product.grossWeight}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-semibold text-muted-foreground">Shelf Life</TableCell>
                                <TableCell>{product.shelfLife}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-semibold text-muted-foreground">Country of Origin</TableCell>
                                <TableCell>{product.countryOfOrigin}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-primary rounded-full" />
                        Chemical Composition
                    </h3>
                    <Table>
                        <TableBody>
                            <TableRow className="bg-muted/50">
                                <TableCell className="font-bold">Component / Ingredient</TableCell>
                                <TableCell className="font-bold text-right">Percentage (w/w)</TableCell>
                            </TableRow>
                            {product.chemicalComposition.map((comp, i) => (
                                <TableRow key={i}>
                                    <TableCell>{comp.ingredient}</TableCell>
                                    <TableCell className="text-right font-mono font-bold text-primary">{comp.percentage}%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <p className="mt-4 text-[10px] text-muted-foreground italic">
                        * Composition is subject to regulatory tolerances as per CIB&RC guidelines.
                    </p>
                </div>
            </div>
        </div>
    );
}
