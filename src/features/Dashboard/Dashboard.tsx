import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { ProductService } from './ProductService';
import { Rating } from 'primereact/rating';
import './Dashboard.css';

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('list');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState<any>(0);
    const [sortField, setSortField] = useState<any>(null);
    const sortOptions = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'},
    ];

    const productService = new ProductService();

    useEffect(() => {
        productService.getProducts().then((data: any) => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onSortChange = (event: any) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        }
        else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    }

    const renderListItem = (data: any) => {
        return (
            <div className="col-12">
                <div className="product-list-item">
                    <Link to="/evaluaciones/latest">
                      <img src={"https://picsum.photos/100/100"} alt={data.name} />
                    </Link>
                    <div className="product-list-detail">
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.description}</div>
                        <Rating value={data.rating} readOnly cancel={false}></Rating>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span>
                    </div>
                    <div className="product-list-action">
                        <span className="product-price">${data.price}</span>
                        <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span>
                    </div>
                </div>
            </div>
        );
    }

    const itemTemplate = (product: any, layout: any) => {
        if (!product) {
            return;
        }

   
        return renderListItem(product);
    
    }

    const renderHeader = () => {
        return (
            <div className="grid grid-nogutter">
                <div className="col-6" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange}/>
                </div>
            </div>
        );
    }

    const header = renderHeader();

    return (
        <div className="dataview-demo">
            <div className="card">
                <DataView value={products} layout={layout} header={header}
                        itemTemplate={itemTemplate} paginator rows={9}
                        sortOrder={sortOrder} sortField={sortField} />
            </div>
        </div>
    );
}